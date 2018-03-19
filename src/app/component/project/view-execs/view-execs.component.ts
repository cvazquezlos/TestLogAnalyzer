import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ITdDataTableColumn} from '@covalent/core';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Project} from '../../../model/project.model';
import {ElasticsearchService} from '../../../service/elasticsearch.service';

@Component({
  selector: 'app-view-execs',
  templateUrl: './view-execs.component.html',
  styleUrls: ['./view-execs.component.css']
})

export class ViewExecsComponent implements OnInit {

  deleteInProgress: boolean;
  execDeleting: string;
  execs: any;
  execsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 100},
    {name: 'startdate', label: 'Start date', width: 300},
    {name: 'entries', label: 'Entries', width: 100},
    {name: 'status', label: 'Status'},
    {name: 'DEBUG', label: 'DEBUG', width: 100},
    {name: 'INFO', label: 'INFO', width: 100},
    {name: 'WARNING', label: 'WARNING', width: 100},
    {name: 'ERROR', label: 'ERROR', width: 100},
    {name: 'options', label: 'Options', width: 150}
  ];
  project: Project = new Project();
  tabs: any[];

  constructor(private activatedRoute: ActivatedRoute, private elasticsearchService: ElasticsearchService,
              private router: Router, private breadcrumbs: BreadcrumbsService) {
  }

  addExec() {
    this.router.navigate(['./', 'add'], {relativeTo: this.activatedRoute});
  }

  delete(row: any) {
    this.deleteInProgress = true;
    this.execDeleting = row.id;
    this.elasticsearchService.deleteLogsByTest(row.id, this.project.name).subscribe(
      response => {
        this.reloadTabContent();
        this.deleteInProgress = false;
        this.execDeleting = '';
      },
      error => console.log(error)
    )
  }

  goTo(row: any) {
    this.router.navigate(['./', row.id], {relativeTo: this.activatedRoute});
  }

  ngOnInit() {
    const name = this.activatedRoute.snapshot.params['project'];
    this.elasticsearchService.getProjectByName(name).subscribe(response => {
        this.project = response;
        this.reloadTabContent();
      }
    );
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []}, {
      label: name,
      url: '/projects/' + name,
      params: []
    }]);
  }

  async reloadTabContent() {
    this.tabs = [];
    const response0 = await this.elasticsearchService.getTabsByProjectAsync(this.project.name);
    for (let i = 0; i < response0.length; i++) {
      const response1 = await this.elasticsearchService.getLogsByProjectAsync(this.project.name, response0[i].tab);
      const executions = [];
      for (let j = 0; j < response1.length; j++) {
        let icon, classi: any;
        if (response1[j].status.indexOf('SUCCESS') !== -1) {
          icon = 'check-circle';
          classi = 'tc-green-700';
        } else {
          icon = 'error';
          classi = 'tc-red-700';
        }
        executions[j] = {
          'id': response1[j].id,
          'startdate': response1[j].timestamp,
          'entries': response1[j].entries,
          'status': {
            'icon': icon,
            'class': classi,
            'status': response1[j].status
          },
          'DEBUG': response1[j].debug,
          'INFO': response1[j].info,
          'WARNING': response1[j].warning,
          'ERROR': response1[j].error
        }
      }
      this.tabs[i] = {
        'name': response0[i].tab,
        'executions': executions
      };
    }
  }
}
