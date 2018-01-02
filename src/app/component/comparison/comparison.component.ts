import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {TdMediaService} from '@covalent/core';

import {Log} from '../../model/source.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})

export class ComparisonComponent {

  @ViewChild('process') process: ElementRef;

  active = false;
  comparatorClass: string;
  comparatorText: string;
  comparedClass: string;
  comparedText: string;
  config = {
    lineNumbers: true,
    theme: 'twilight',
    readOnly: 'nocursor',
    lineWrapping : true,
    mode: 'xml' };
  execsComparator: any[] = [];
  execsCompared: any[] = [];
  execsNumber = 0;
  methods: any[] = [];
  results = [];
  showResults = false;

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService) {
    this.initInfo('1');
    this.comparatorText = '';
    this.comparedText = '';
  }

  comparator(exec: any) {
    this.prepareContent(exec, this.execsCompared, 0);
  }

  compared(exec: any) {
    this.prepareContent(exec, this.execsComparator, 1);
  }

  private prepareContent(exec: any, execs: any[], type: number) {
    if (!this.isSelectedAnyElement(execs)) {
      this.addExecs(this.execsComparator, exec.id, exec.method);
      this.addExecs(this.execsCompared, exec.id, exec.method);
      exec.class = 'active';
      this.loadInfo(exec.id, type, exec.method);
      this.deleteExec(execs, exec);
    } else {
      exec.class = 'active';
      this.loadInfo(exec.id, type, exec.method);
      this.deleteExec(execs, exec);
    }
  }

  generateComparison() {
    const comparisonResult = this.process.nativeElement.innerHTML.toString();
    let lines = this.correctMistakes(comparisonResult.split('<br>'), '<ins>', '</ins>');
    lines = this.correctMistakes(lines, '<del>', '</del>');
    let originalSize, modifiedComparatorSize, modifiedComparedSize, j, k: number;
    let acum1 = '';
    let acum2 = '';
    j = 1;
    k = 1;
    let index1, index2: string;
    this.results = [];
    for (let i = 0; i < lines.length - 1; i++) {
      originalSize = lines[i].length;
      console.log(originalSize);
      this.comparatorClass = 'normal';
      this.comparedClass = 'normal';
      let comparatorLine = lines[i];
      let comparedLine = lines[i];
      comparatorLine = this.deleteUselessData(comparatorLine, '<ins>', '</ins>', 1);
      comparatorLine = acum1 + comparatorLine;
      modifiedComparatorSize = comparatorLine.length;
      comparedLine = this.deleteUselessData(comparedLine, '<del>', '</del>', 0);
      comparedLine = acum2 + comparedLine;
      modifiedComparedSize = comparedLine.length;
      if (modifiedComparatorSize < (originalSize * 0.3)) {
        this.comparatorClass = 'added';
        acum1 = comparatorLine;
        acum2 = '';
        comparatorLine = '';
        index2 = k.toString() + '.';
        k++;
      } else if (modifiedComparedSize < (originalSize * 0.3)) {
        this.comparedClass = 'added';
        acum2 = comparedLine;
        acum1 = '';
        comparedLine = '';
        index1 = j.toString() + '.';
        j++;
      } else {
        acum1 = '';
        acum2 = '';
        index1 = j.toString() + '.';
        index2 = k.toString() + '.';
        j++;
        k++;
      }
      this.concatResults(index1, index2, comparatorLine, comparedLine);
    }
    this.showResults = true;
  }

  methodSelected(method: any) {
    this.deselect();
    this.showResults = false;
    this.comparatorText = '';
    this.comparedText = '';
    this.execsComparator = [];
    this.execsCompared = [];
    this.countExecs(0, method.title.replace('(', '').replace(')', ''));
    method.class = 'meth-active';
    this.active = true;
  }

  private addExecs(execs: any[], exec: number, method: string) {
    let classN = 'execs';
    execs = [];
    for (let i = 0; i < this.execsNumber; i++) {
      if (i + 1 === exec) {
        classN = 'active';
      }
      execs = execs.concat({
        'id': i + 1,
        'class': classN,
        'method': method
      });
      classN = 'execs';
    }
  }

  private concatData(data: any[]) {
    let exec = '';
    data.forEach(dat => exec += dat.entire_log + '\n');
    return exec;
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

  private countExecs(index: number, method) {
    this.elasticsearchService.count(2, (index + 1).toString()).subscribe(
      count => {
        if (count !== 0) {
          this.execsComparator = this.execsComparator.concat({
            'id': index + 1,
            'class': 'execs',
            'method': method,
          });
          this.execsCompared = this.execsCompared.concat({
            'id': index + 1,
            'class': 'execs',
            'method': method,
          });
          this.countExecs(index + 1, method);
        } else {
          this.execsNumber = index;
        }
      }
    );
  }

  private deleteExec(execs: any[], exec: any) {
    let index = 0;
    for (const execution of execs) {
      if (execution.id === exec.id) {
        execs.splice(index, 1);
        break;
      }
      index += 1;
    }
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

  private initInfo(value: string) {
    this.elasticsearchService.get(1, 1000, '1', false).subscribe(
      data1 => {
        this.methods = [];
        let logs: Log[] = [];
        logs = logs.concat(data1);
        for (const log of logs) {
          const args = log.formatted_message.split(' ');
          if ((this.methods.indexOf(args[1]) === -1) && (args[2] === 'method')) {
            this.methods = this.methods.concat({
              'icon': 'event_note',
              'title': args[1],
              'class': 'no-active'
            })
          }
        }
      }
    );
  }

  private isSelectedAnyElement(execs: any[]) {
    for (const exec of execs) {
      if (exec.class === 'active') {
        return true;
      }
    }
    return false;
  }

  private loadInfo(exec: string, type: number, method: string) {
    this.elasticsearchService.get(2, 1000, exec, false, method).subscribe(
      data => {
        let aux = [];
        aux = aux.concat(data);
        switch (type) {
          case 0:
            this.comparatorText = this.concatData(aux);
            break;
          case 1:
            this.comparedText = this.concatData(aux);
            break;
        }
      }
    );
  }

  private deselect() {
    this.methods.forEach(method => method.class = 'no-active');
  }
}
