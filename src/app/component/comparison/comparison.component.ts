import {ChangeDetectionStrategy,
  Component} from '@angular/core';
import { TdMediaService } from '@covalent/core';

import {Log} from '../../model/source.model';

import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html'
})

export class ComparisonComponent {
  routes: Object[] = [{
    icon: 'home',
    route: '.',
    title: 'Home',
  }, {
    icon: 'library_books',
    route: '.',
    title: 'Documentation',
  }, {
    icon: 'color_lens',
    route: '.',
    title: 'Style Guide',
  }, {
    icon: 'view_quilt',
    route: '.',
    title: 'Layouts',
  }, {
    icon: 'picture_in_picture',
    route: '.',
    title: 'Components & Addons',
  },
  ];
  usermenu: Object[] = [{
    icon: 'swap_horiz',
    route: '.',
    title: 'Switch account',
  }, {
    icon: 'tune',
    route: '.',
    title: 'Account settings',
  }, {
    icon: 'exit_to_app',
    route: '.',
    title: 'Sign out',
  },
  ];
  navmenu: Object[] = [{
    icon: 'looks_one',
    route: '.',
    title: 'First item',
    description: 'Item description',
  }, {
    icon: 'looks_two',
    route: '.',
    title: 'Second item',
    description: 'Item description',
  }, {
    icon: 'looks_3',
    route: '.',
    title: 'Third item',
    description: 'Item description',
  }, {
    icon: 'looks_4',
    route: '.',
    title: 'Fourth item',
    description: 'Item description',
  }, {
    icon: 'looks_5',
    route: '.',
    title: 'Fifth item',
    description: 'Item description',
  },
  ];
  methods: Object[] = [];
  selected = false;

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService) {
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
