import {Component} from '@angular/core';
import {GridOptions} from 'ag-grid/main';

import {Log} from '../model/source.model';

import {ElasticsearchService} from '../service/elasticsearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  columnDefs: any[];
  currentResults: number;
  defaultFrom = new Date(new Date().valueOf() - (10 * 60 * 60 * 1000));
  defaultTo = new Date(new Date().valueOf() - (1 * 60 * 60 * 1000));
  gridOptions: GridOptions;
  logs: Log[];
  showBack: boolean;
  showGrid: boolean;
  showMore: boolean;
  recentData: Log[];
  rowCount: number;
  rowData: any[];


  constructor(private elasticsearchService: ElasticsearchService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.domLayout = 'autoHeight';
    this.columnDefs = [
      {headerName: 'timestamp', field: 'timestamp', width: 110},
      {headerName: 'agent', field: 'agent', width: 500},
      {headerName: 'auth', field: 'auth', width: 20},
      {headerName: 'bytes', field: 'bytes', width: 20},
      {headerName: 'ident', field: 'ident', width: 30},
      {headerName: 'request', field: 'request', width: 80},
      {headerName: 'response', field: 'response', width: 20},
      {headerName: 'verb', field: 'verb', width: 20}
    ];
    this.showBack = false;
    this.showMore = true;
    this.currentResults = 50;
    this.logs = [];
    this.addLogs(true);
  }

  addLogs(real: boolean) {
    this.elasticsearchService.listAllLogs(this.currentResults).subscribe(
      data => {
        if (real) {
          this.showGrid = false;
          this.logs = this.logs.concat(data);
          this.rowData = [];
          for (const log of this.logs) {
            log.parsedDate = this.parseDate(log.timestamp);
            this.rowData = this.rowData.concat({
              timestamp: log.parsedDate.toUTCString().replace(' GMT', ''),
              agent: log.agent,
              auth: log.auth,
              bytes: log.bytes,
              ident: log.ident,
              request: log.request,
              response: log.response,
              verb: log.verb
            });
            // console.log(log.parsedDate.toUTCString()); Format: Wed, 18 May 2011 19:40:18 GMT
            // console.log(log.parsedDate.toLocaleDateString()); Format: 18/5/2011
            // console.log(log.parsedDate.toLocaleString()); Format: 18/5/2011 21:40:18
            // console.log(log.parsedDate.toLocaleTimeString()); Format: 21:40:18
          }
          this.rowCount = this.rowData.length;
          this.showGrid = true;
        } else {
          if (this.rowCount >= data.length) {
            this.showMore = false;
          }
          this.currentResults-=50;
        }
      },
      error => console.log(error)
    );
  }

  addLogsBetweenDates(from: Date, to: Date) {
    this.elasticsearchService.listAllLogsBetweenDates(from.toString(), to.toString()).subscribe(
      data => {
        this.recentData = this.logs;
        this.logs = [];
        this.logs = this.logs.concat(data);
        this.rowData = [];
        for (const log of this.logs) {
          log.parsedDate = this.parseDate(log.timestamp);
          this.rowData = this.rowData.concat({
            timestamp: log.parsedDate.toUTCString().replace(' GMT', ''),
            agent: log.agent,
            auth: log.auth,
            bytes: log.bytes,
            ident: log.ident,
            request: log.request,
            response: log.response,
            verb: log.verb
          });
        }
        this.showBack = true;
        this.rowCount = this.rowData.length;
      },
      error => console.log(error)
    );
  }

  chargeOldData() {
    this.logs = this.recentData;
    this.rowData = [];
    for (const log of this.logs) {
      log.parsedDate = this.parseDate(log.timestamp);
      this.rowData = this.rowData.concat({
        timestamp: log.parsedDate.toUTCString().replace(' GMT', ''),
        agent: log.agent,
        auth: log.auth,
        bytes: log.bytes,
        ident: log.ident,
        request: log.request,
        response: log.response,
        verb: log.verb
      });
    }
    this.showBack = false;
    this.rowCount = this.rowData.length;
  }

  getDefaultFromValue() {
    return this.defaultFrom;
  }

  getDefaultToValue() {
    return this.defaultTo;
  }

  loadMore() {
    this.logs = [];
    this.currentResults+=50;
    this.addLogs(true);
    this.currentResults+=50;
    this.addLogs(false);
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
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

  private parseDate(date: string) {
    const dayMonth: string[] = date.split('/');
    const yearHourMin: string[] = dayMonth[dayMonth.length - 1].split(':');
    const secUTCDif: string[] = yearHourMin[yearHourMin.length - 1].split(' ');
    return new Date(yearHourMin[0] + '-' + dayMonth[0] + '-' + dayMonth[1] + ':' + yearHourMin[1] + ':' +
      yearHourMin[2] + ':' + secUTCDif[0] + secUTCDif[1]);
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }
}
