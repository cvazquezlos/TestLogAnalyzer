import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {TdMediaService} from '@covalent/core';

import {Log} from '../../model/log.model';
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

  active = false;
  comparatorText: string;
  comparedText: string;
  execsComparator: any[] = [];
  execsCompared: any[] = [];
  execsNumber = 0;
  logsComparator: Log[];
  logsCompared: Log[];
  methods: any[] = [];
  mode = 0;
  results = [];
  showResults = false;

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService,
              private diffService: DiffService, private execStatusService: ExecsStatusService) {
    this.initInfo('1');
  }

  // Method is called when button "Execute" is pressed.
  generateComparison() {
    switch (this.mode) {
      case (2):
        this.comparatorText = this.diffService.timeDiff(this.logsComparator);
        this.comparedText = this.diffService.timeDiff(this.logsCompared);
        break;
      case (1):
        this.loadInfo(localStorage.getItem('CExecI'), localStorage.getItem('CExecM'), '4 0');
        this.loadInfo(localStorage.getItem('cExecI'), localStorage.getItem('cExecM'), '4 1');
    }
    this.results = this.diffService.generateComparison(this.process.nativeElement.innerHTML.toString());
    this.showResults = true;
  }

  // Method is called when any method is selected.
  methodSelected(method: any) {
    this.deselect();
    this.showResults = false;
    this.comparatorText = '';
    this.comparedText = '';
    this.execsComparator = [];
    this.execsCompared = [];
    this.countExecs(0, method.title.replace('(', '').replace(')', ''));
    method.class = 'true';
    this.active = true;
  }

  // Method is called when any execution of a determined method is selected.
  prepare(exec: any, code: number) {
    (code === 0) ? (this.updateStatus(exec, 0)) : (this.updateStatus(exec, 1));
    (code === 0) ? (localStorage.setItem('CExecI', exec.id)) : (localStorage.setItem('cExecI', exec.id));
    (code === 0) ? (localStorage.setItem('CExecM', exec.method)) : (localStorage.setItem('cExecM', exec.method));
  }

  private updateStatus(code: number, exec: any) {
    switch (code) {
      case 0:
        this.execsComparator = this.execStatusService.comparatorClic(exec.id, exec.method).comparator;
        this.execsCompared = this.execStatusService.comparatorClic(exec.id, exec.method).compared;
        break;
      case 1:
        this.execsComparator = this.execStatusService.comparedClic(exec.id, exec.method).comparator;
        this.execsCompared = this.execStatusService.comparedClic(exec.id, exec.method).compared;
        break;
    }
    console.log(this.execsCompared);
    console.log(this.execsComparator);
  }

  // Method is called when a mode button is clicked.
  setMode(mode: number) {
    this.mode = mode;
  }

  private concatData(data: any[]) {
    let exec = '';
    data.forEach(dat => {
      exec += (dat.timestamp + ' [' + dat.thread_name + '] ' + dat.level + ' ' + dat.logger_name + '' +
        ' ' + dat.formatted_message) + '\n';
    });
    return exec;
  }

  private countExecs(index: number, method: string) {
    this.elasticsearchService.count(2, (index + 1).toString()).subscribe(
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
              'class': 'false'
            })
          }
        }
      }
    );
  }

  private loadInfo(exec: string, method: string, codeType: string) {
    this.elasticsearchService.get(+codeType.split(' ')[0], 1000, exec, false, method).subscribe(
      data => {
        switch (+codeType.split(' ')[1]) {
          case 0:
            this.logsComparator = [];
            this.logsComparator = this.logsComparator.concat(data);
            this.comparatorText = this.concatData(this.logsComparator);
            break;
          case 1:
            this.logsCompared = [];
            this.logsCompared = this.logsCompared.concat(data);
            this.comparedText = this.concatData(this.logsCompared);
            break;
        }
      }
    );
  }
}
