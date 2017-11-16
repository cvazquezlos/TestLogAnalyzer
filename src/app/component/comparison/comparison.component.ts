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
  methods: Object[] = [];

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService) {
    this.initInfo('1');
  }

  comparator(exec: any) {
    exec.class = 'active';
    this.deleteExec(this.execsCompared, exec);
  }

  compared(exec: any) {
    exec.class= 'active';
    this.deleteExec(this.execsComparator, exec);
  }

  methodSelected(method: string) {
    console.log('Method selected: ' + method);
    console.log('Loading executions...');
    this.execsComparator = [];
    this.execsCompared = [];
    this.countExecs(0);
    this.active = true;
  }

  private countExecs(index: number) {
    this.elasticsearchService.count(2, (index + 1).toString()).subscribe(
      count => {
        if (count !== 0) {
          this.countExecs(index + 1);
          this.execsComparator = this.execsComparator.concat({
            'id': index + 1,
            'class': 'execs'
          });
          this.execsCompared = this.execsCompared.concat({
            'id': index + 1,
            'class': 'execs'
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
    console.log(this.execsCompared);
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
}
