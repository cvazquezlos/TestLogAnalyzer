import {
  AfterViewInit,
  Component
} from '@angular/core';
import {Router} from '@angular/router';
import {
  ITdDataTableColumn,
  TdMediaService
} from '@covalent/core';
import {Project} from '../model/project.model';
import {ElasticsearchService} from '../service/elasticsearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit {

  deleteInProgress: boolean;
  exec: boolean;
  projectsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 100},
    {name: 'name', label: 'Name'},
    {name: 'options', label: 'Options', width: 150}
  ];
  projectsRowData: any[] = [];

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService, private router: Router) {
    this.deleteInProgress = false;
    this.exec = false;
    this.reloadTable();
  }

  delete(project: Project) {
    this.elasticsearchService.deleteProject(project.id).subscribe(response => this.reloadTable());
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.media.broadcast();
    });
  }

  reloadTable() {
    this.exec = true;
    this.elasticsearchService.getProjects().subscribe(response => {
      this.projectsRowData = [];
      for (let i = 0; i < response.length; i++) {
        this.projectsRowData[i] = {
          'id': response[i].id,
          'name': response[i].name
        };
      }
    });
    this.exec = false;
  }

  viewProject(event: any) {
    this.router.navigateByUrl('/' + event.row.name);
  }
}
