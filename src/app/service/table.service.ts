import {Injectable} from '@angular/core';

@Injectable()
export class TableService {

  comparatorClass: string;
  comparedClass: string;
  lastCloseTag: string;
  lastOpenTag: string;
  results: any[];

  constructor() {
  }

  generateTable(diff: string): any[] {
    console.log(diff);
    this.results = [];
    this.comparatorClass = 'normal';
    this.comparedClass = 'normal';
    const lines = diff.split('<br>');
    lines.pop();
    console.log(lines);
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
    this.solveResultErrors();
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

  private solveResultErrors() {
    for (let i = 0; i < this.results.length; i++) {
      const result = this.results[i];
      if ((result.com_p.content.indexOf('<del>') !== -1) && (result.com_p !== undefined)) {
        result.com_p.class = 'delC';
      }
      if ((result.comp.content.indexOf('<ins>') !== -1) && (this.results[i].comp !== undefined)) {
        result.comp.class = 'insC';
      }
      this.results[i] = result;
    };
  }
}
