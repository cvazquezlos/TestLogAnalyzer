import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ITdDataTableColumn} from '@covalent/core';
import {Project} from '../../model/project.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent {

  deleteInProgress: boolean;
  execs: any;
  execsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 100},
    {name: 'timestamp', label: 'Timestamp', width: 200},
    {name: 'entries', label: 'Entries', width: 100},
    {name: 'status', label: 'Status'},
    {name: 'DEBUG', label: 'DEBUG', width: 80},
    {name: 'INFO', label: 'INFO', width: 80},
    {name: 'WARNING', label: 'WARNING', width: 80},
    {name: 'ERROR', label: 'ERROR', width: 80},
    {name: 'options', label: 'Options', width: 150}
  ];
  execsRowData: any[] = [];
  project: Project;

  constructor(private activatedRoute: ActivatedRoute, private elasticsearchService: ElasticsearchService) {
    const name = this.activatedRoute.snapshot.params['project'];
    this.elasticsearchService.getProjectByName(name).subscribe(response => {
        this.project = response;
      }
    );
    this.elasticsearchService.loadExecutionsByProject(name).subscribe(response => {
      this.execsRowData = [];
      for (let i = 0; i < response.length; i++) {
        this.execsRowData[i] = {
          'id': response[i].id,
          'timestamp': response[i].timestamp.split(' ')[0],
          'entries': response[i].entries,
          'status': response[i].status,
          'DEBUG': response[i].debug,
          'INFO': response[i].info,
          'WARNING': response[i].warning,
          'ERROR': response[i].error
        }
      }
    });
  }
}
