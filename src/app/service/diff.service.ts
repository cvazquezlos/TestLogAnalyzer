import {Injectable} from '@angular/core';
import {Log} from '../model/log.model';

@Injectable()
export class DiffService {

  comparator: string;
  comparatorClass: string;
  compared: string;
  comparedClass: string;
  iteratorContent: any;
  results: any[];

  private solveInsMistakes() {

  }

  generateComparison(diff: string) {
    const lines = this.solveMistakes(diff.replace('<div>', '').replace('</div>', '')
      .split('<br>'), ['<del>', this.reverse('<del>')], ['</del>', this.reverse('</del>')]);
    const l = this.solveInsMistakes();
    lines.pop();
    console.log(lines);
    let comparatorLine, comparedLine, i, j: any;
    this.results = [];
    i = 1;
    j = 1;
    lines.forEach(line => {
      comparatorLine = this.deleteUselessData(line, '<ins>', '</ins>', 0);
      comparedLine = this.deleteUselessData(line, '<del>', '</del>', 1);
      this.concatResults(i, j, comparatorLine, comparedLine);
      i++;
      j++;
    });
    return this.results;
  }

  private solveMistakes(lines: string[], init: string[], end: string[]) {
    let wholeLog = '';
    let added = '';
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].lastIndexOf(init[0]) > lines[i].lastIndexOf(end[0])) {
        wholeLog = lines[i].substr(0, lines[i].indexOf(init[0]));
        if (lines[i].indexOf('<del>') !== lines[i].lastIndexOf('</del>')) {
          added = lines[i].substring(lines[i].indexOf('<del>'), lines[i].lastIndexOf('<del>'));

          lines[i] = lines[i].replace(added, added + '<ins>_doNotCare</ins>');
          while (added.indexOf('<del>') !== -1) {
            const useless = added.substring(added.indexOf('<del>') + 5, added.indexOf('</del>'));
            added = added.replace('<del>' + useless + '</del>', '').replace('</ins>', '') + '</ins>';
          }
        } else {
          added = '';
        }
        console.log(added);
        lines[i] = init[0] + wholeLog + lines[i].replace(wholeLog, '') + end[0];
      } else {
        const enil = this.reverse(lines[i]);
        if ((enil.lastIndexOf(end[1])) > (enil.lastIndexOf(init[1]))) {
          lines[i] = lines[i].replace(wholeLog, '');
          lines[i] = init[0] + lines[i];
          lines[i] = wholeLog + added + lines[i];
        }
      }
    }
    return lines;
  }

  private reverse(str: string) {
    return str.split('').reverse().join('');
  }

  generateOutput(log: Log) {
    return (log.timestamp + ' [' + log.thread_name + '] ' + log.level + ' ' + log.logger_name + '' +
      ' ' + log.formatted_message) + '\n';
  }

  noTimestampDiff(data: any[]) {
    let result = '';
    data.forEach(noTLog => {
      noTLog.timestamp = '';
      result += this.generateOutput(noTLog);
    });
    return result;
  }

  setComparator(comparator: string) {
    this.comparator = comparator;
  }

  setCompared(compared: string) {
    this.compared = compared;
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

  private deleteUselessData(line: string, t1: string, t2: string, id: number) {
    let uselessData;
    while (line.indexOf(t1) !== -1) {
      uselessData = line.substring(line.indexOf(t1) + 5, line.indexOf(t2));
      if (id === 1 && (line.indexOf('_doNotCare') !== -1)) {
        this.comparedClass = 'added';
        line = '';
      } else {
        (id === 0) ? (this.comparatorClass = 'delC') : (this.comparedClass = 'insC');
        if (line.indexOf(t1) + 5 === line.indexOf(t2)) {
          (id === 0) ? (this.comparatorClass = 'normal') : (this.comparedClass = 'normal');
        }
        line = line.replace(t1 + uselessData + t2, '');
      }
    }
    return line;
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
