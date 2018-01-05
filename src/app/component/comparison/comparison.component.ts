import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {TdMediaService} from '@covalent/core';

import {DiffMatchPatchService} from 'ng-diff-match-patch/dist/diffMatchPatch.service';

import {Log} from '../../model/log.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';
import {DiffService} from '../../service/diff.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})

export class ComparisonComponent {

  @ViewChild('process') process: ElementRef;

  active = false;
  comparatorText: string;
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
  mode = 0;
  results = [];
  showResults = false;

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService, private diffService: DiffService) {
    this.initInfo('1');
    this.comparatorText = '';
    this.comparedText = '';
  }

  generateComparison() {
    switch (this.mode) {
      case (1):
        this.loadInfo(localStorage.getItem('CExecI'), 0, localStorage.getItem('CExecM'), 4);
        this.loadInfo(localStorage.getItem('cExecI'), 1, localStorage.getItem('cExecM'), 4);
        break;
      case (2):
        break;
      case (0):
    }
    this.results = this.diffService.generateComparison(this.process.nativeElement.innerHTML.toString());
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

  prepare(exec: any, code: number) {
    (code === 0) ? (this.prepareContent(exec, this.execsCompared, 0)) : (this.prepareContent(exec, this.execsComparator, 1));
    (code === 0) ? (localStorage.setItem('CExecI', exec.id)) : (localStorage.setItem('cExecI', exec.id));
    (code === 0) ? (localStorage.setItem('CExecM', exec.method)) : (localStorage.setItem('cExecM', exec.method));
  }

  setMode(mode: number) {
    this.mode = mode;
  }

  private addExecs(execs: any[], exec: number, method: string) {
    let classN = 'execs';
    execs = [];
    for (let i = 0; i < this.execsNumber; i++) {
      (i + 1 === exec) ? (classN = 'active') : (classN = 'execs');
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
    data.forEach(dat => {
      exec += (dat.timestamp + ' [' + dat.thread_name + '] ' + dat.level + ' ' + dat.logger_name + '' +
        ' ' + dat.formatted_message) + '\n';
    });
    return exec;
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

  private deselect() {
    this.methods.forEach(method => method.class = 'no-active');
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

  private loadInfo(exec: string, type: number, method: string, code: number) {
    this.elasticsearchService.get(code, 1000, exec, false, method).subscribe(
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

  private prepareContent(exec: any, execs: any[], type: number) {
    if (!this.isSelectedAnyElement(execs)) {
      this.addExecs(this.execsComparator, exec.id, exec.method);
      this.addExecs(this.execsCompared, exec.id, exec.method);
      exec.class = 'active';
      this.loadInfo(exec.id, type, exec.method, 2);
      this.deleteExec(execs, exec);
    } else {
      exec.class = 'active';
      this.loadInfo(exec.id, type, exec.method, 2);
      this.deleteExec(execs, exec);
    }
  }
}
