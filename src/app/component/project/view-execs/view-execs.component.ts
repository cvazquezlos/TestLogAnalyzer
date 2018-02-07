import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ITdDataTableColumn} from '@covalent/core';
import {Project} from '../../../model/project.model';
import {ElasticsearchService} from '../../../service/elasticsearch.service';

@Component({
  selector: 'app-view-execs',
  templateUrl: './view-execs.component.html',
  styleUrls: ['./view-execs.component.css']
})

export class ViewExecsComponent {

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
  execsRowData: any[] = [];
  project: Project = new Project();

  constructor(private activatedRoute: ActivatedRoute, private elasticsearchService: ElasticsearchService, private router: Router) {
    const name = this.activatedRoute.snapshot.params['project'];
    this.elasticsearchService.getProjectByName(name).subscribe(response => {
        this.project = response;
        this.reloadTable(name);
      }
    );
  }

  delete(row: any) {
    this.deleteInProgress = true;
    this.execDeleting = row.id;
    this.elasticsearchService.deleteExec(row.id, this.project.name).subscribe(response => {
      this.reloadTable(this.project.name);
      this.deleteInProgress = false;
      this.execDeleting = '';
    })
  }

  addExec() {
    this.router.navigate(['./', this.project.name, '/add'], {relativeTo: this.activatedRoute});
  }

  reloadTable(name: string) {
    this.elasticsearchService.loadExecutionsByProject(name).subscribe(response => {
      this.execsRowData = [];
      for (let i = 0; i < response.length; i++) {
        this.execsRowData[i] = {
          'id': response[i].id,
          'startdate': response[i].timestamp,
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

  viewExec(row: any) {
    this.router.navigateByUrl('/' + this.project.name + '/' + row.id);
  }
}
