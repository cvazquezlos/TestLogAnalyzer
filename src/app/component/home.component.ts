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

import {Log} from '../model/source.model';
import {ElasticsearchService} from '../service/elasticsearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  clickable = true;
  columnDefs: ITdDataTableColumn[];
  currentPage: number;
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
  searchTerm = '';
  selectable = true;
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
      {name: 'test',       label: 'test',               width: 40},
      {name: 'id',         label: 'id', sortable: true, width: 60},
      {name: 'timestamp',  label: 'timestamp',          width: 220},
      {name: 'thread',     label: 'thread',             width: 65},
      {name: 'level',      label: 'level',              width: 70},
      {name: 'class name', label: 'class',              width: 420},
      {name: 'message',    label: 'message',            width: 500}
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

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  tostring(id: number): void {
    let log = this.findById(id);
    this.subtitle = log.entireLog;
  }

  private countLogs(code: number) {
    this.elasticsearchService.count(code).subscribe(
      count => this.totalData = count,
      error => console.log(error)
    );
  }

  private findById(id: number): any {
    for (let log of this.logs) {
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
          log = this.parseLog(log);
          this.rowData = this.rowData.concat({
            id          : log.id,
            'test'      : log.testNo,
            timestamp   : log.timestamp,
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
  
  private parseLog(old: Log): Log {
    let new = old;
    new.id = +old.id;
    new.testNo = +old.testNo;
    let value = old.timestamp.split(' ');
    new.timestamp = value[1];
    value = old.loggerName.split('.');
    new.loggerName = value[3];
    return new;
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
