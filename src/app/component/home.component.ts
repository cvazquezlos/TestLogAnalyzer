import {Component} from '@angular/core';
import {RedComponentComponent} from '../red-component/red-component.component';
import {GridOptions} from 'ag-grid/main';

import {Log} from '../model/log.model';
import {Response} from '../model/response.model';

import {ElasticsearchService} from '../service/elasticsearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  response: Response;
  logs: Log[];
  showGrid: boolean;
  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  constructor(private elasticsearchService: ElasticsearchService) {
    this.gridOptions = <GridOptions>{};
    this.columnDefs = [
      {headerName: 'Make', field: 'make'},
      {headerName: 'Model', field: 'model', cellRendererFramework: RedComponentComponent},
      {headerName: 'Price', field: 'price'}
    ];
    this.rowData = [
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000}
    ];
    this.showGrid = true;
    this.logs = [];
    this.addLogs();
  }

  addLogs() {
    this.elasticsearchService.listAllLogs().subscribe(
      response => this.response,
      error => console.log('Fail trying to get ES logs.')
    );/*
    this.logs = this.response.hits;
    for (let log of this.logs) {
      console.log(log._id);
    }*/
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }
}
