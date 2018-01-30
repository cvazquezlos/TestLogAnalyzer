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

import {Log} from '../model/log.model';
import {ElasticsearchService} from '../service/elasticsearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit {

  projectsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 100},
    {name: 'name', label: 'Name'},
    {name: 'options', label: 'Options'}
  ];
  projectsRowData: any[] = [];

  constructor(private elasticsearchService: ElasticsearchService, private _dataTableService: TdDataTableService,
              public media: TdMediaService) {
    this.projectsRowData = this.projectsRowData.concat({
      'id': 1, 'name': 'Example', 'options': 'Hola'
    });
    this.elasticsearchService.getProjects().subscribe(response=>console.log(response));
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    setTimeout(() => { // workaround since MatSidenav has issues redrawing at the beggining
      this.media.broadcast();
    });
  }
}
