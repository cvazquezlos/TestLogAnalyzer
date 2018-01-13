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

  active = false;
  comparatorText: string;
  comparedText: string;
  comparison = false;
  execsComparator: any[] = [];
  execsCompared: any[] = [];
  execsNumber = 0;
  methods: any[] = [];
  mode = 0;
  results = [];

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService,
              private diffService: DiffService, private execStatusService: ExecsStatusService) {
    this.initInfo();
  }

  generateComparison() {
    this.loadInfo(localStorage.getItem('CExecI'), localStorage.getItem('CExecM'), '2 0');
    this.loadInfo(localStorage.getItem('cExecI'), localStorage.getItem('cExecM'), '2 1');
    this.results = this.diffService.generateComparison(this.process.nativeElement.innerHTML.toString());
    this.comparison = true;
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
