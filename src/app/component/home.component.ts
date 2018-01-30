import {
  AfterViewInit,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import {
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
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

  projectsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 300},
    {name: 'name', label: 'Name'},
    {name: 'options', label: 'Options'}
  ];
  projectsRowData: any[] = [];

  constructor(private elasticsearchService: ElasticsearchService, private _dataTableService: TdDataTableService,
              public media: TdMediaService) {
    this.reloadTable();
  }

  private reloadTable() {
    this.projectsRowData = [];
    this.elasticsearchService.getProjects().subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        this.projectsRowData[i] = {
          'id': response[i].id,
          'name': response[i].name
        };
      }
    });
  }

  delete(project: Project) {
    this.elasticsearchService.deleteProject(project.id).subscribe(response => this.reloadTable());
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    setTimeout(() => { // workaround since MatSidenav has issues redrawing at the beggining
      this.media.broadcast();
    });
  }
}
