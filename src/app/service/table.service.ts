import {Injectable} from '@angular/core';

@Injectable()
export class TableService {

  comparatorClass: string;
  comparedClass: string;
  lastCloseTag: string;
  lastOpenTag: string;
  oldData: string;
  results: any[];

  constructor() {
  }

  generateTable(diff: string): any[] {
    this.results = [];
    this.comparatorClass = 'normal';
    this.comparedClass = 'normal';
    const lines = diff.split('<br>');
    lines.pop();
    let comparedLine = '', comparatorLine = '';
    let i = 1;
    lines.forEach(line => {
      line = this.closeOpenedTags(line.replace('&para;', ''));
      line = this.openClosedTags(line);
      comparatorLine = this.cleanBetweenTags('<ins>', '</ins>', line, 0);
      comparedLine = this.cleanBetweenTags('<del>', '</del>', line, 1);
      this.concatResults(i, comparatorLine, comparedLine);
      i++;
    });
    this.solveUselessDiffs();
    this.solveBasicTableColors();
    // this.solveResultErrors();
    return this.results;
  }

  private cleanBetweenTags(open: string, close: string, line: string, code: number): string {
    let uselessData;
    while (line.indexOf(open) !== -1) {
      uselessData = line.substring(line.indexOf(open) + 5, line.indexOf(close));
      line = line.replace(open + uselessData + close, '');
    }
    if (line.length < 2) {
      (code === 0) ? (this.comparatorClass = 'added') : (this.comparedClass = 'added');
    }
    return line;
  }

  private closeOpenedTags(line: string): string {
    const targetPos = line.lastIndexOf('<');
    const tagStarting = line.substring(targetPos, targetPos + 2);
    switch (tagStarting) {
      case '<s':
        line = line + '</span>';
        this.lastCloseTag = '</span>';
        this.lastOpenTag = '<span>';
        break;
      case '<d':
        line = line + '</del>';
        this.lastCloseTag = '</del>';
        this.lastOpenTag = '<del>';
        break;
      case '<i':
        line = line + '</ins>';
        this.lastCloseTag = '</ins>';
        this.lastOpenTag = '<ins>';
        break;
      default:
        line = this.lastOpenTag + line + this.lastCloseTag;
    }
    return line;
  }

  private concatResults(i: number, comparator: string, compared: string): void {
    this.results = this.results.concat({
      'index_p': i,
      'com_p': {
        'content': comparator,
        'class': this.comparatorClass
      },
      'indexp': i,
      'comp': {
        'content': compared,
        'class': this.comparedClass
      }
    });
    this.comparatorClass = 'normal';
    this.comparedClass = 'normal';
  }

  private openClosedTags(line: string): string {
    const targetPos = line.indexOf('<');
    const tagStarting = line.substring(targetPos, targetPos + 3);
    switch (tagStarting) {
      case '</s':
        line = '<span>' + line;
        break;
      case '</d':
        line = '<del>' + line;
        break;
      case '</i':
        line = '<ins>' + line;
        break;
    }
    return line;
  }

  private solveBasicTableColors() {
    for (let i = 0; i < this.results.length; i++) {
      const result = this.results[i];
      if ((result.com_p.content.indexOf('<del>') !== -1) && (result.com_p !== undefined)) {
        result.com_p.class = 'delC';
        result.comp.class = 'added';
      }
      if ((result.comp.content.indexOf('<ins>') !== -1) && (result.comp !== undefined)) {
        result.comp.class = 'insC';
        if (result.com_p.class !== 'delC') {
          result.com_p.class = 'added';
        }
      }
      this.results[i] = result;
    }
  }

  private solveUselessDiffs() {
    for (let i = 0; i < this.results.length; i++) {
      const result = this.results[i];
      let comparator = result.com_p.content;
      if (comparator.indexOf('<del>') === comparator.lastIndexOf('<del>') && (comparator.indexOf('<del>') === 0)) {
        const content = comparator.substring(comparator.indexOf('<del>') + 5, comparator.indexOf('</del>'));
        if (/^[^A-Za-z0-9]*$/g.test(content)) {
          comparator = '';
          result.comp.class = 'normal';
        }
      }
      result.com_p.content = comparator;
      let compared = result.comp.content;
      if (comparator.indexOf('<ins>') === comparator.lastIndexOf('<ins>') && (compared.indexOf('<ins>') === 0)) {
        const content = compared.substring(compared.indexOf('<ins>') + 5, compared.indexOf('</ins>'));
        if (/^[^A-Za-z0-9]*$/g.test(content)) {
          compared = '';
          result.com_p.class = 'normal';
        }
      }
      result.comp.content = compared;
      this.results[i] = result;
    }
  }

  private solveResultErrors() {
    this.oldData = '';
    let entry = false, entry2 = false, lastLength = 0, newLength = 0, oldDataC = '';
    for (let i = 0; i < this.results.length; i++) {
      const result = this.results[i];
      let comparator = result.com_p.content;
      if (((comparator.indexOf('<del>') !== -1) && (result.com_p !== undefined)) || (entry2)) {
        newLength = comparator.length;
        const diffPart = comparator.substring(comparator.indexOf('<del>'), comparator.lastIndexOf('</del>') + 6);
        result.com_p.class = 'delC';
        if (((diffPart.length / comparator.length) > 0.75) && (!entry2)) {
          if (comparator.indexOf('<span>') !== -1) {
            this.oldData = comparator.substring(comparator.indexOf('<span>') + 6, comparator.indexOf('</span>'));
            const cleanOldData = this.oldData.replace('<span>', '').replace('</span>', '');
            comparator = comparator.replace(this.oldData, '');
            comparator = comparator.replace('<del>', '<del>' + cleanOldData);
            result.comp.content = result.comp.content.replace(cleanOldData, '');
            result.comp.class = 'added';
            entry = true;
          }
        }
        if ((newLength / lastLength) < 0.3) {
          oldDataC = comparator;
          comparator = '';
          result.com_p.class = 'added';
          entry2 = true;
        } else if (entry2 && (comparator.length > 0)) {
          comparator = oldDataC + comparator;
          entry2 = false;
          oldDataC = '';
        }
        result.com_p.content = comparator;
        lastLength = comparator.length;
      }
      let compared = result.comp.content;
      if ((result.comp.content.indexOf('<ins>') !== -1) && (this.results[i].comp !== undefined)) {
        result.comp.class = 'insC';
        if ((compared.indexOf('<ins>') !== -1) && entry) {
          entry = false;
          const cleanOldData = this.oldData.replace('<span>', '').replace('</span>', '');
          if (compared.indexOf(cleanOldData) === -1) {
            compared = compared.replace('<ins>', '<ins>' + this.oldData
              .replace('<span>', '').replace('</span>', ''));
          }
          this.oldData = '';
        }
      }
      result.comp.content = compared;
      this.results[i] = result;
    }
  }
}
