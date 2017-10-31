import {DataSource} from '@angular/cdk/collections';
import {Component,
  Inject} from '@angular/core';
import {MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef} from '@angular/material';
import {IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder,
  TdDialogService
} from '@covalent/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {Log} from '../model/source.model';
import {ElasticsearchService} from '../service/elasticsearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {

  clickable = true;
  columnDefs: ITdDataTableColumn[];
  comparationCols: any[];
  comparationData: any[];
  currentPage: number;
  dataSourceComp: DataSourceComp;
  eventLinks: IPageChangeEvent;
  filteredData: any[];
  filteredTotal: number;
  fromDate: Date;
  logs: Log[];
  mavenMessages: boolean;
  multiple = true;
  pageSize: number;
  rowCount: number;
  rowData: any[];
  rowClicked: Log;
  searchTerm = '';
  selectable = true;
  selectedLog: Log;
  selectedRows: Log[] = [];
  showMore: boolean;
  sortBy = 'id';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  subtitle = '';
  toDate: Date;
  totalData: number;

  constructor(private elasticsearchService: ElasticsearchService, public dialog: MatDialog,
              private _dialogService: TdDialogService, private _dataTableService: TdDataTableService) {
    this.columnDefs = [
      {name: 'test',       label: 'test'},
      {name: 'id',         label: 'id', sortable: true},
      {name: 'timestamp',  label: 'timestamp'},
      {name: 'thread',     label: 'thread'},
      {name: 'level',      label: 'level'},
      {name: 'class name', label: 'class', width: 500},
      {name: 'message',    label: 'message', width: { min: 500, max: 700 }}
    ];
    this.pageSize = 50;
    this.currentPage = 1;
    this.countLogs(1);
    this.showMore = true;
    this.logs = [];
    this.loadInfo(1);
  }

  changeLinks(event: IPageChangeEvent): void {
    this.eventLinks = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.page;
    this.evaluateResult();
  }

  evaluateResult() {
    if (this.mavenMessages) {
      this.loadInfo(0);
      this.countLogs(0);
    } else {
      this.loadInfo(1);
      this.countLogs(1);
    }
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

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterComponent, {
      data: {fromDate: this.fromDate, toDate: this.toDate}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.fromDate);
      this.loadInfo(2,
        this.parseData(
          ('0' + result.fromDate.getDate()).slice(-2),
          ('0' + (result.fromDate.getMonth() + 1)).slice(-2),
          result.fromDate.getFullYear()
        ), this.parseData(
          ('0' + result.toDate.getDate()).slice(-2),
          ('0' + (result.toDate.getMonth() + 1)).slice(-2),
          result.toDate.getFullYear()
        ))
    });
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsComponent, {
      data: {mavenMessages: this.mavenMessages}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.mavenMessages = result.mavenMessages;
      this.evaluateResult();
    });
  }

  rowClick(event: any): void {
    this.rowClicked = this.findById(event.row.id);
    this.updatingCard();
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

  selectLog(id: number): void {
    this.selectedLog = this.findById(id);
    this.subtitle = this.selectedLog.entireLog;
  }

  updatingCard(): void {
    this.comparationCols = ['logID', 'logTimestamp', 'logThread', 'logLevel', 'logClass', 'logMessage'];
    this.comparationData = [this.selectedLog, this.rowClicked];
    this.dataSourceComp = new DataSourceComp(this.comparationData);
  }

  private countLogs(code: number) {
    this.elasticsearchService.count(code).subscribe(
      count => this.totalData = count,
      error => console.log(error)
    );
  }

  private findById(id: number): any {
    for (const log of this.logs) {
      if (id == log.id) {
        return log;
      }
    }
    return -1;
  }

  private loadInfo(code: number, from?: string, to?: string) {
    let page = (this.currentPage * this.pageSize) - this.pageSize;
    if (page < 0) {
      page = 0;
    }
    this.elasticsearchService.get(code, this.pageSize, page, from, to).subscribe(
      data => {
        this.logs = [];
        this.logs = this.logs.concat(data);
        this.rowData = [];
        for (const log of this.logs) {
          this.rowData = this.rowData.concat({
            id          : (+log.id),
            'test'      : (+log.testNo),
            timestamp   : (log.timestamp.split(' '))[0],
            'thread'    : log.threadName,
            level       : log.level,
            'class name': log.loggerName,
            message     : log.formattedMessage
          });
        }
        this.rowCount = this.rowData.length;
      },
      error => console.log(error)
    );
  }

  private parseData(day: string, month: string, year: string): string {
    console.log(year + '-' + month + '-' + day);
    return year + '-' + month + '-' + day;
  }
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter/filter.component.html',
  styleUrls: ['./filter/filter.component.css']
})
export class FilterComponent {

  constructor(public dialogRef: MatDialogRef<FilterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings/settings.component.html',
})
export class SettingsComponent {

  constructor(public dialogRef: MatDialogRef<SettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export class DataSourceComp extends DataSource<any> {

  data: any[];

  constructor(data: any[]) {
    super();
    this.data = data;
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}
