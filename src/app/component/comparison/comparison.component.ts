/// <reference path='../../../assets/comparison/google-diff-match-patch.js'/>

import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {TdMediaService} from '@covalent/core';

import {DiffService} from '../../service/diff.service';
import {ElasticsearchService} from '../../service/elasticsearch.service';
import {ExecsStatusService} from '../../service/execs-status.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})

export class ComparisonComponent {

  @ViewChild('process') process: ElementRef;
  @ViewChild('data1') output: any;

  active = false;
  comparatorText: string;
  comparedText: string;
  comparison = false;
  dmp = new diff_match_patch();
  execsComparator: any[] = [];
  execsCompared: any[] = [];
  execsNumber = 0;
  left: any;
  methods: any[] = [];
  mode = 0;
  right: HTMLElement;
  results = [];
  tagMap = {};

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService,
              private diffService: DiffService, private execStatusService: ExecsStatusService) {
    this.initInfo();
    //console.log(document.getElementById('textRich'));
  }

  generateComparison() {
    this.loadInfo(localStorage.getItem('CExecI'), localStorage.getItem('CExecM'), '2 0');
    this.loadInfo(localStorage.getItem('cExecI'), localStorage.getItem('cExecM'), '2 1');
    this.results = this.diffService.generateComparison(this.process.nativeElement.innerHTML.toString());
    console.log(this.comparatorText);
    console.log(this.comparedText);
    let diffs = this.dmp.diff_main(this.comparatorText, this.comparedText, null, null);
    console.log(diffs);
    diffs = this.dmp.diff_cleanupSemantic(diffs);
    console.log(diffs);
    let diffOutput = '';
    for (var x = 0; x < diffs.length; x++) {
      diffs[x][1] = this.insertTagsForOperation(diffs[x][1], diffs[x][0]);
      diffOutput += this.convertDiffableBackToHtml(diffs[x][1]);
    }
    console.log(diffOutput);
    this.comparison = true;
  }

  convertDiffableBackToHtml(diffableString: string) {
    var htmlString = '';
    for (var x = 0; x < diffableString.length; x++) {
      var charCode = diffableString.charCodeAt(x);
      if (charCode < 0xE000) {
        htmlString += diffableString[x];
        continue;
      }
      var tagString = this.tagMap[diffableString[x]];
      if (tagString === undefined) {
        // We somehow have a character that is above our range but didn't map
        // Do we need to add an upper bound or change the range?
        htmlString += diffableString[x];
      }
      else {
        htmlString += tagString;
      }
    }
    return htmlString;
  }

  insertTagsForOperation(diffableString: string, operation: number) {
    var openTag = '';
    var closeTag = '';
    if (operation === 1) {
      openTag = '<ins>';
      closeTag = '</ins>';
    }
    else if (operation === -1) {
      openTag = '<del>';
      closeTag = '</del>';
    }
    else {
      return diffableString;
    }
    var outputString = openTag;
    var isOpen = true;
    for (var x = 0; x < diffableString.length; x++) {
      if (diffableString.charCodeAt(x) < 0xE000) {
        // We just hit a regular character. If tag is not open, open it.
        if (!isOpen) {
          outputString += openTag;
          isOpen = true;
        }
        outputString += diffableString[x];
      }
      else {
        // We just hit one of our mapped unicode characters. Close our tag.
        if (isOpen) {
          outputString += closeTag;
          isOpen = false;
        }
        outputString += diffableString[x];
      }
    }
    if (isOpen)
      outputString += closeTag;
    return outputString;
  }

  methodSelected(method: any) {
    this.deselect();
    this.comparison = false;
    this.comparatorText = '';
    this.comparedText = '';
    this.execsComparator = [];
    this.execsCompared = [];
    this.countExecs(0, method.title.replace('(', '').replace(')', ''));
    method.class = 'true';
    this.active = true;
  }

  execution(exec: any, code: number) {
    (code === 0) ? (this.updateStatus(0, exec)) : (this.updateStatus(1, exec));
    (code === 0) ? (localStorage.setItem('CExecI', exec.id)) : (localStorage.setItem('cExecI', exec.id));
    (code === 0) ? (localStorage.setItem('CExecM', exec.method)) : (localStorage.setItem('cExecM', exec.method));
  }

  setMode(mode: number) {
    this.mode = mode;
  }

  private concatData(data: any[]) {
    let exec = '';
    data.forEach(log => {
      exec += this.diffService.generateOutput(log);
    });
    return exec;
  }

  private countExecs(index: number, method: string) {
    this.elasticsearchService.count(2, [(index + 1).toString(), undefined, undefined]).subscribe(
      count => {
        if (count !== 0) {
          this.countExecs(index + 1, method);
        } else {
          this.execsNumber = index;
          this.execsComparator = this.execStatusService.initialize(this.execsNumber, method).comparator;
          this.execsCompared = this.execStatusService.initialize(this.execsNumber, method).compared;
        }
      }
    );
  }

  private deselect() {
    this.methods.forEach(method => method.class = 'no-active');
  }

  private initInfo() {
    this.elasticsearchService.get([1, 1000], ['1', undefined], false).subscribe(
      data => {
        this.methods = [];
        for (const log of data) {
          const args = log.formatted_message.split(' ');
          if ((this.methods.indexOf(args[1]) === -1) && (args[2] === 'method')) {
            this.methods = this.methods.concat({'icon': 'event_note', 'title': args[1], 'class': 'false'});
          }
        }
      }
    );
  }

  private loadInfo(exec: string, method: string, codeType: string) {
    this.elasticsearchService.get([+codeType.split(' ')[0], 1000], [exec, method], false).subscribe(
      data => {
        let lines: string;
        (this.mode === 1) ? (lines = this.diffService.noTimestampDiff(data))
          : ((this.mode === 2) ? (lines = this.diffService.timeDiff(data))
          : (lines = this.concatData(data)));
        switch (+codeType.split(' ')[1]) {
          case 0:
            this.comparatorText = lines;
            break;
          case 1:
            //(document.getElementById('rightt') as HTMLInputElement).value = lines;
            this.comparedText = lines;
            break;
        }
      }
    );
  }

  private updateStatus(code: number, exec: any) {
    let result;
    (code === 0) ? (result = this.execStatusService.comparatorClic(+exec.id, exec.method))
      : (result = this.execStatusService.comparedClic(+exec.id, exec.method));
    this.execsComparator = result.comparator;
    this.execsCompared = result.compared;
  }
}
