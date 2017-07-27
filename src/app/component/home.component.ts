import {Component} from '@angular/core';
import {GridOptions} from 'ag-grid/main';

import {Log} from '../model/source.model';

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
      {headerName: '@timestamp', field: 'timestamp', width: 150},
      {headerName: 'agent', field: 'agent', width: 500},
      {headerName: 'auth', field: 'auth', width: 20},
      {headerName: 'bytes', field: 'bytes', width: 20},
      {headerName: 'ident', field: 'ident', width: 30},
      {headerName: 'request', field: 'request', width: 80},
      {headerName: 'response', field: 'response', width: 20},
      {headerName: 'verb', field: 'verb', width: 20}
    ];
    this.logs = [];
    this.addLogs();
  }

  addLogs() {
    this.elasticsearchService.listAllLogs().subscribe(
      data => {
        this.logs = this.logs.concat(data);
        this.rowData = [];
        for (const log of this.logs) {
          this.rowData = this.rowData.concat({timestamp: log.timestamp, agent: log.agent, auth: log.auth, bytes: log.bytes,
            ident: log.ident, request: log.request, response: log.response, verb: log.verb});
        }
        this.showGrid = true;
      },
      error => console.log('Fail trying to get Elasticsearch logs.')
    );
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }

  onAfterFilterChanged() {
    console.log('onAfterSortChanged');
  }

  onBeforeFilterChanged() {
    console.log('beforeFilterChanged');
  }

  onCellClicked($event) {
    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  onCellDoubleClicked($event) {
    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  onCellContextMenu($event) {
    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  onCellFocused($event) {
    console.log('onCellFocused: (' + $event.rowIndex + ')');
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  onRowSelected($event) {
    console.log('onRowSelected: ' + $event.node.data.name);
  }
}
