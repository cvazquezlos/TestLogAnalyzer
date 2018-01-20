/// <reference path='../../../bower_components/dt-angular/angular.d.ts'/>
/// <reference path='google-diff-match-patch.module.ts'/>
module AngularRichTextDiff {
  'use strict';

  interface IRichTextDiffScope extends ng.IScope {
    left: string;
    right: string;
    diffOutput: string;
  }

  interface ITagMapping {
    tag: string;
    unicodeReplacement: string;
  }

  class RichTextDiffController {

    static $inject = ['$scope', '$sce'];

    unicodeRangeStart = 0xE000;
    tagMap: any;
    mapLength: number;
    dmp: DiffMatchPatch;

    constructor(public $scope: IRichTextDiffScope, public $sce: ng.ISCEService) {
      $scope.$watch('left', () => {
        this.doDiff();
      });
      $scope.$watch('right', () => {
        this.doDiff();
      });
      this.tagMap = {};
      this.mapLength = 0;

      // Go ahead and map nbsp;
      const unicodeCharacter = String.fromCharCode(this.unicodeRangeStart + this.mapLength);
      this.tagMap['&nbsp;'] = unicodeCharacter;
      this.tagMap[unicodeCharacter] = '&nbsp;';
      this.mapLength++;

      this.dmp = new DiffMatchPatch();
      this.doDiff();
    }

    doDiff(): void {
      const diffableLeft = this.convertHtmlToDiffableString(this.$scope.left);
      const diffableRight = this.convertHtmlToDiffableString(this.$scope.right);
      const diffs = this.dmp.diff_main(diffableLeft, diffableRight);
      this.dmp.diff_cleanupSemantic(diffs);
      let diffOutput = '';
      for (let x = 0; x < diffs.length; x++) {
        diffs[x][1] = this.insertTagsForOperation(diffs[x][1], diffs[x][0]);
        diffOutput += this.convertDiffableBackToHtml(diffs[x][1]);
      }

      this.$scope.diffOutput = this.$sce.trustAsHtml(diffOutput);
    }

    insertTagsForOperation(diffableString: string, operation: number): string {

      // Don't insert anything if these are all tags
      let n = -1;
      do {
        n++;
      }
      while (diffableString.charCodeAt(n) >= this.unicodeRangeStart + 1);
      if (n >= diffableString.length) {
        return diffableString;
      }

      let openTag = '';
      let closeTag = '';
      if (operation === 1) {
        openTag = '<ins>';
        closeTag = '</ins>';
      } else if (operation === -1) {
        openTag = '<del>';
        closeTag = '</del>';
      } else {
        return diffableString;
      }

      let outputString = openTag;
      let isOpen = true;
      for (let x = 0; x < diffableString.length; x++) {
        if (diffableString.charCodeAt(x) < this.unicodeRangeStart) {
          // We just hit a regular character. If tag is not open, open it.
          if (!isOpen) {
            outputString += openTag;
            isOpen = true;
          }

          // Always add regular characters to the output
          outputString += diffableString[x];
        } else {
          // We just hit one of our mapped unicode characters. Close our tag.
          if (isOpen) {
            outputString += closeTag;
            isOpen = false;
          }

          // If this is a delete operation, do not add the deleted tags
          // to the output
          if (operation === -1) {
            continue;
          } else {
            outputString += diffableString[x];
          }
        }
      }

      if (isOpen) {
        outputString += closeTag;
      }

      return outputString;
    }

    convertHtmlToDiffableString(htmlString: string): string {
      htmlString = htmlString.replace(/&nbsp;/g, this.tagMap['&nbsp;']);
      let diffableString = '';

      let offset = 0;
      while (offset < htmlString.length) {
        const tagStart = htmlString.indexOf('<', offset);
        if (tagStart < 0) {
          diffableString += htmlString.substr(offset);
          break;
        } else {
          const tagEnd = htmlString.indexOf('>', tagStart);
          if (tagEnd < 0) {
            // Invalid HTML
            // Truncate at the start of the tag
            console.log('Invalid HTML. String will be truncated.');
            diffableString += htmlString.substr(offset, tagStart - offset);
            break;
          }

          const tagString = htmlString.substr(tagStart, tagEnd + 1 - tagStart);

          // Is this tag already mapped?
          let unicodeCharacter = this.tagMap[tagString];
          if (unicodeCharacter === undefined) {
            // Nope, need to map it
            unicodeCharacter = String.fromCharCode(this.unicodeRangeStart + this.mapLength);
            this.tagMap[tagString] = unicodeCharacter;
            this.tagMap[unicodeCharacter] = tagString;
            this.mapLength++;
          }

          // At this point it has been mapped, so now we can use it
          diffableString += htmlString.substr(offset, tagStart - offset);
          diffableString += unicodeCharacter;

          offset = tagEnd + 1;
        }
      }

      return diffableString;
    }

    convertDiffableBackToHtml(diffableString: string): string {
      let htmlString = '';

      for (let x = 0; x < diffableString.length; x++) {
        const charCode = diffableString.charCodeAt(x);
        if (charCode < this.unicodeRangeStart) {
          htmlString += diffableString[x];
          continue;
        }

        let tagString = this.tagMap[diffableString[x]];
        if (tagString === undefined) {
          // We somehow have a character that is above our range but didn't map
          // Do we need to add an upper bound or change the range?
          htmlString += diffableString[x];
        } else {
          htmlString += tagString;
        }
      }

      return htmlString;
    }
  }

  function richTextDiff(): ng.IDirective {
    const directive = <ng.IDirective> {
      restrict: 'E',
      scope: {
        left: '=left',
        right: '=right'
      },
      template: '<div ng-bind-html="diffOutput"></div>',
      controller: RichTextDiffController
    };

    return directive;
  }

  angular.module('angular-rich-text-diff', ['ngSanitize']);

  angular
    .module('angular-rich-text-diff')
    .directive('richTextDiff', richTextDiff);
}
