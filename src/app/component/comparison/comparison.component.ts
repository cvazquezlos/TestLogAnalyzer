import {Component} from '@angular/core';

import {Log} from '../../model/source.model';

import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html'
})

export class ComparisonComponent {

  methods: Object[] = [];

  items: Object[] = [{
    color: 'deep-purple-A700',
    icon: 'view_list',
    route: 'steps',
    title: 'Stepper',
  }, {
    color: 'blue-A700',
    icon: 'open_with',
    route: 'expansion-panel',
    title: 'Expansion Panel',
  }, {
    color: 'pink-A700',
    icon: 'space_bar',
    route: 'file-input',
    title: 'File Input',
  }, {
    color: 'cyan-A700',
    icon: 'attach_file',
    route: 'file-upload',
    title: 'File Upload',
  }, {
    color: 'deep-orange-A700',
    icon: 'label',
    route: 'chips',
    title: 'Chips',
  }, {
    color: 'lime-A700',
    icon: 'hourglass_empty',
    route: 'loading',
    title: 'Loading',
  }, {
    color: 'amber-A700',
    icon: 'open_in_browser',
    route: 'dialogs',
    title: 'Simple Dialogs',
  }, {
    color: 'green-A700',
    icon: 'grid_on',
    route: 'data-table',
    title: 'Data Table',
  }, {
    color: 'orange-A700',
    icon: 'format_line_spacing',
    route: 'virtual-scroll',
    title: 'Virtual Scroll',
  }, {
    color: 'teal-A700',
    icon: 'format_indent_increase',
    route: 'json-formatter',
    title: 'JSON Formatter',
  }, {
    color: 'indigo-A700',
    icon: 'swap_horiz',
    route: 'paging',
    title: 'Paging',
  }, {
    color: 'purple-A700',
    icon: 'notifications',
    route: 'notifications',
    title: 'Notifications',
  }, {
    color: 'light-blue-A700',
    icon: 'info_outline',
    route: 'message',
    title: 'Messages',
  }, {
    color: 'indigo-A700',
    icon: 'search',
    route: 'search',
    title: 'Search',
  }, {
    color: 'red-A700',
    icon: 'devices',
    route: 'media',
    title: 'Media Queries',
  }, {
    color: 'light-blue-A700',
    icon: 'wb_iridescent',
    route: 'directives',
    title: 'Directives',
  }, {
    color: 'deep-orange-A700',
    icon: 'filter_list',
    route: 'pipes',
    title: 'Pipes',
  },
    {
      color: 'amber-A700',
      icon: 'theaters',
      route: 'animations',
      title: 'Animations',
    },
  ];

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

}
