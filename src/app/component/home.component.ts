import {Component} from '@angular/core';
import {MdDialog} from '@angular/material';
import {ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder,
  TdDialogService} from '@covalent/core';
import {GridOptions} from 'ag-grid/main';

import {Log} from '../model/source.model';
import {ElasticsearchService} from '../service/elasticsearch.service';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  columnDefs: ITdDataTableColumn[];
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

  filteredData: any[];
  filteredTotal: number;

  searchTerm = '';
  selectable = true;
  clickable = true;
  multiple = true;
  sortBy = 'agent';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private elasticsearchService: ElasticsearchService, public dialog: MdDialog,
              private _dialogService: TdDialogService, private _dataTableService: TdDataTableService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.domLayout = 'autoHeight';
    this.columnDefs = [
      {name: 'timestamp', label: 'timestamp'},
      {name: 'agent', label: 'agent', sortable: true},
      {name: 'auth', label: 'auth'},
      {name: 'bytes', label: 'bytes'},
      {name: 'ident', label: 'ident'},
      {name: 'request', label: 'request'},
      {name: 'response', label: 'response'},
      {name: 'verb', label: 'verb'}
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
          this.filteredData = this.rowData;
          this.filteredTotal = this.rowData.length;
          this.showGrid = true;
        } else {
          if (this.rowCount >= data.length) {
            this.showMore = false;
          }
          this.currentResults -= 50;
        }
      },
      error => console.log(error)
    );
  }

  openPrompt(row: any, name: string): void {
    this._dialogService.openPrompt({
      message: 'Enter comment?',
      value: row[name],
    }).afterClosed().subscribe((value: any) => {
      if (value !== undefined) {
        row[name] = value;
      }
    });
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
    this.currentResults += 50;
    this.addLogs(true);
    this.currentResults += 50;
    this.addLogs(false);
  }

  public openDialog() {
    const dialogRef = this.dialog.open(SettingsComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.rowData;
    let excludedColumns: string[] = this.columnDefs
      .filter((column: ITdDataTableColumn) => {
        return ((column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false));
      }).map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    this.filteredData = newData;
  }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings/settings.component.html',
})
export class SettingsComponent {}
