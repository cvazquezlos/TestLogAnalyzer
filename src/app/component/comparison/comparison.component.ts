import {ChangeDetectionStrategy,
  Component} from '@angular/core';
import { TdMediaService } from '@covalent/core';

import {Log} from '../../model/source.model';

import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})

export class ComparisonComponent {

  active = false;
  execsComparator: any[] = [];
  execsCompared: any[] = [];
  execsNumber = 0;
  config = {
    lineNumbers: true,
    theme:'twilight',
    readOnly: 'nocursor',
    lineWrapping : true,
    mode: 'xml' };
  methods: Object[] = [];
  comparatorText: string;
  comparedText: string;

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService) {
    this.initInfo('1');
    this.comparatorText = '';
    this.comparedText = '';
  }

  comparator(exec: any) {
    if (!this.isSelectedAnyElement(this.execsCompared)) {
      this.addExecs(1, exec.id);
      this.addExecs(2, exec.id);
      exec.class = 'active';
      console.log(exec.id);
      this.loadInfo(exec.id, 0);
      this.deleteExec(this.execsCompared, exec);
    } else {
      this.loadInfo(exec.id, 0);
      exec.class = 'active';
      this.deleteExec(this.execsCompared, exec);
    }
  }

  compared(exec: any) {
    if (!this.isSelectedAnyElement(this.execsComparator)) {
      this.addExecs(1, exec.id);
      this.addExecs(2, exec.id);
      exec.class = 'active';
      console.log(exec.id);
      this.loadInfo(exec.id, 1);
      this.deleteExec(this.execsComparator, exec);
    } else {
      this.loadInfo(exec.id, 1);
      exec.class = 'active';
      this.deleteExec(this.execsComparator, exec);
    }
  }

  methodSelected(method: string) {
    console.log('Method selected: ' + method);
    console.log('Loading executions...');
    this.execsComparator = [];
    this.execsCompared = [];
    this.countExecs(0, method.replace('(', '').replace('(',''));
    this.active = true;
  }

  private addExecs(type: number, exec: number) {
    let classN = 'execs';
    switch (type) {
      case 1:
        this.execsComparator = [];
        for (let i = 0; i < this.execsNumber; i++) {
          if (i + 1 === exec) {
            classN = 'active';
          }
          this.execsComparator = this.execsComparator.concat({
            'id': i + 1,
            'class': classN
          });
          classN = 'execs';
        }
        break;
      case 2:
        this.execsCompared = [];
        for (let i = 0; i < this.execsNumber; i++) {
          if (i + 1 === exec) {
            classN = 'active';
          }
          this.execsCompared = this.execsCompared.concat({
            'id': i + 1,
            'class': classN
          });
          classN = 'execs';
        }
        break;
    }
  }

  private countExecs(index: number, method) {
    this.elasticsearchService.count(2, (index + 1).toString()).subscribe(
      count => {
        if (count !== 0) {
          this.countExecs(index + 1, method);
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
        } else {
          this.execsNumber = index;
          console.log('Success. Avaible executions: ' + this.execsNumber);
        }
      },
      error => console.log(error)
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

  private initInfo(value: string) {
    this.elasticsearchService.get(1, 1000, '1', false).subscribe(
      data1 => {
        console.log('Loading test names...');
        this.methods = [];
        let logs: Log[] = [];
        logs = logs.concat(data1);
        for (const log of logs) {
          const args = log.formatted_message.split(' ');
          if ((this.methods.indexOf(args[1]) === -1) && (args[2] === 'method')) {
            this.methods = this.methods.concat({
              'icon': 'event_note',
              'title': args[1]
            })
          }
        }
        console.log('Test names added.');
      },
      error => console.log(error)
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

  private loadInfo(exec: string, type: number) {
    this.elasticsearchService.get(0, 1000, exec, true, undefined).subscribe(
      data => {
        let aux = [];
        aux = aux.concat(data);
        switch (type) {
          case 0:
            this.comparatorText = '';
            for (let dat of aux) {
              this.comparatorText += dat.entire_log + '\n';
            }
            break;
          case 1:
            this.comparedText = '';
            for (let dat of aux) {
              this.comparedText += dat.entire_log + '\n';
            }
            break;
        }
      },
      error => console.log(error)
    );
  }
}
