import {Component,
  Inject} from '@angular/core';
import {MdDialog,
  MdDialogRef,
  MD_DIALOG_DATA} from '@angular/material';
import {ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder,
  TdDialogService} from '@covalent/core';
import {GridOptions} from 'ag-grid/main';

import {Log} from '../model/source.model';
import {ElasticsearchService} from '../service/elasticsearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {

  columnDefs: ITdDataTableColumn[];
  currentResults: number;
  defaultFrom = new Date(new Date().valueOf() - (10 * 60 * 60 * 1000));
  defaultTo = new Date(new Date().valueOf() - (1 * 60 * 60 * 1000));
  fromDate: Date;
  toDate: Date;
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
  sortBy = 'thread';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private elasticsearchService: ElasticsearchService, public dialog: MdDialog,
              private _dialogService: TdDialogService, private _dataTableService: TdDataTableService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.domLayout = 'autoHeight';
    this.columnDefs = [
      {name: 'timestamp', label: 'timestamp'},
      {name: 'thread', label: 'thread', sortable: true},
      {name: 'level', label: 'level'},
      {name: 'class', label: 'class'},
      {name: 'crudmessage', label: 'crudmessage'},
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
            this.rowData = this.rowData.concat({
              timestamp: log.timestamp,
              thread: log.thread,
              level: log.level,
              class: log.class,
              crudmessage: log.crudmessage
            });
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

  addLogsBetweenDates(from: string, to: string) {
    this.elasticsearchService.listAllLogsBetweenDates(from, to).subscribe(
      data => {
        this.recentData = this.logs;
        this.logs = [];
        this.logs = this.logs.concat(data);
        this.rowData = [];
        for (const log of this.logs) {
          this.rowData = this.rowData.concat({
            timestamp: log.timestamp,
            thread: log.thread,
            level: log.level,
            class: log.class,
            crudmessage: log.crudmessage
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
      this.rowData = this.rowData.concat({
        timestamp: log.timestamp,
        thread: log.thread,
        level: log.level,
        class: log.class,
        crudmessage: log.crudmessage
      });
    }
    this.showBack = false;
    this.rowCount = this.rowData.length;
  }

  filter(): void {
    let newData: any[] = this.rowData;
    const excludedColumns: string[] = this.columnDefs
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

  openDialog() {
    const dialogRef = this.dialog.open(SettingsComponent, {
      data: {fromDate: this.fromDate, toDate: this.toDate}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(('0'+result.fromDate.getDate()).slice(-2));
      console.log(('0'+(result.fromDate.getMonth()+1)).slice(-2));
      console.log(result.fromDate.getFullYear());
      console.log('FROM DATE: '+this.parseData(
        ('0'+result.fromDate.getDate()).slice(-2),
        ('0'+(result.fromDate.getMonth()+1)).slice(-2),
        result.fromDate.getFullYear()
      ));
      console.log('TO DATE: '+this.parseData(
        ('0'+result.toDate.getDate()).slice(-2),
        ('0'+(result.toDate.getMonth()+1)).slice(-2),
        result.toDate.getFullYear()
      ));
    });
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

  private parseData(day: string, month: string, year: string): string {
    return year + '-' + month + '-' + day + ' 00:00:00.000';
  }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings/settings.component.html',
})
export class SettingsComponent {

  constructor(public dialogRef: MdDialogRef<SettingsComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
