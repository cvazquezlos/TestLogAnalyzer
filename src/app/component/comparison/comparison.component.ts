import {Component} from '@angular/core';

import {Log} from '../../model/source.model';

import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html'
})

export class ComparisonComponent {

  methods: Object[] = [];
  selected = false;

  constructor(private elasticsearchService: ElasticsearchService) {
    this.initInfo('1');
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
              'color': 'orange-700',
              'icon': 'event_note',
              'route': args[1],
              'title': args[1]
            })
          }
        }
        console.log(this.methods);
        console.log('Test names added.');
      },
      error => console.log(error)
    );
  }

  private update() {
    this.selected = true;
  }

}
