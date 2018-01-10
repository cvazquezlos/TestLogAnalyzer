import {Injectable} from '@angular/core';
import {Log} from '../model/log.model';

@Injectable()
export class DiffService {

  comparatorClass: any;
  comparedClass: any;
  iteratorContent: any;
  results: any[];

  generateComparison(diff: string) {
    let lines = this.correctMistakes(diff.split('<br>'), '<ins>', '</ins>');
    lines = this.correctMistakes(lines, '<del>', '</del>');
    let j, k, comparatorLine, comparedLine, c1, c2: any;
    this.results = [];
    this.resetIterator();
    lines.pop();
    lines.forEach(line => {
      j = this.iteratorContent.j;
      k = this.iteratorContent.k;
      comparatorLine = this.deleteUselessData(line, '<ins>', '</ins>', 1);
      comparatorLine = this.iteratorContent.a1 + comparatorLine;
      comparedLine = this.deleteUselessData(line, '<del>', '</del>', 0);
      comparedLine = this.iteratorContent.a2 + comparedLine;
      (comparatorLine.length < (line.length * 0.3)) ? (this.updateIndexes(comparatorLine, '', '',
        comparedLine, j, k + 1, this.iteratorContent.i1, k.toString() + '.', 0)) : (c1 = true);
      (comparedLine.length < (line.length * 0.3)) ? (this.updateIndexes('', comparedLine, comparatorLine,
        '', j + 1, k, j.toString() + '.', this.iteratorContent.i2, 1)) : (c2 = true);
      if (c1 && c2) {
        this.updateIndexes('', '', comparatorLine, comparedLine, j + 1, k + 1, j.toString() + '.', k.toString() + '.');
      }
      this.concatResults(this.iteratorContent.i1, this.iteratorContent.i2, this.iteratorContent.line1, this.iteratorContent.line2);
    });
    return this.results;
  }

  noTimestampDiff(data: any[]) {
    let result = '';
    data.forEach(noTLog => {
      noTLog.timestamp = '';
      result += this.generateOutput(noTLog);
    });
    return result;
  }

  timeDiff(data: any[]) {
    let result = '';
    const dateOrigin = new Date(data[0].timestamp);
    data.forEach(tDiffLog => {
      tDiffLog.timestamp = ((new Date(tDiffLog.timestamp)).valueOf() - (dateOrigin).valueOf()).toString();
      result += this.generateOutput(tDiffLog);
    });
    return result;
  }

  private concatResults(index1: any, index2: any, comparatorLine: any, comparedLine: any) {
    this.results = this.results.concat({
      'index_p': index1,
      'com_p': {'content': comparatorLine.replace('<div>', '').replace('</div>', ''),
        'class': this.comparatorClass},
      'indexp': index2,
      'comp': {'content': comparedLine.replace('<div>', '').replace('</div>', ''),
        'class': this.comparedClass}
    });
    this.comparatorClass = 'normal';
    this.comparedClass = 'normal';
  }

  private correctMistakes(lines: any[], t1: string, t2: string) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].lastIndexOf(t1) > lines[i].lastIndexOf(t2)) {
        lines[i] = lines[i] + t2;
      } else if (lines[i].indexOf(t2) < lines[i].indexOf(t1)) {
        lines[i] = t1 + lines[i];
      }
    }
    return lines;
  }

  private deleteUselessData(line: string, t1: string, t2: string, id: number) {
    let uselessData;
    while (line.indexOf(t1) !== -1) {
      uselessData = line.substring(line.indexOf(t1) + 5, line.indexOf(t2));
      line = line.replace(t1 + uselessData + t2, '');
      (id === 1) ? (this.comparatorClass = 'delC') : (this.comparedClass = 'insC');
    }
    return line;
  }

  private generateOutput(log: Log) {
    return (log.timestamp + ' [' + log.thread_name + '] ' + log.level + ' ' + log.logger_name + '' +
      ' ' + log.formatted_message) + '\n';
  }

  private resetIterator() {
    this.iteratorContent = {'a1': '', 'a2': '', 'line1': '', 'line2': '', 'j': 1, 'k': 1, 'i1': '', 'i2': ''};
  }

  private updateIndexes(a1: any, a2: any, value1: any, value2: any, j: any, k: any, i1: any, i2: any, id?: number) {
    (id) && ((id === 0) ? (this.comparatorClass = 'added') : (this.comparedClass = 'added'));
    this.iteratorContent = {
      'a1': a1, 'a2': a2,
      'line1': value1, 'line2': value2,
      'j': j, 'k': k,
      'i1': i1, 'i2': i2,
    };
  }
}
