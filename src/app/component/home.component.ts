import {Component,
  Inject} from '@angular/core';
import {MD_DIALOG_DATA,
  MdDialog,
  MdDialogRef} from '@angular/material';
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
  templateUrl: './home.component.html'
})

export class HomeComponent {

  clickable = true;
  columnDefs: ITdDataTableColumn[];
  currentResults: number;
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
  selectedRows: any[] = [];
  showMore: boolean;
  sortBy = 'id';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  toDate: Date;
  totalData: number;

  constructor(private elasticsearchService: ElasticsearchService, public dialog: MdDialog,
              private _dialogService: TdDialogService, private _dataTableService: TdDataTableService) {
    this.columnDefs = [
      {name: 'test number', label: 'test number'},
      {name: 'id',          label: 'id', sortable: true},
      {name: 'timestamp',   label: 'timestamp'},
      {name: 'thread name', label: 'thread name'},
      {name: 'level',       label: 'level'},
      {name: 'class name',  label: 'class'},
      {name: 'message',     label: 'message'},
    ];
    this.pageSize = 50;
    this.countLogs();
    this.showMore = true;
    this.currentResults = 50;
    this.logs = [];
    this.loadInfo(1);
  }

  private countLogs(){
    this.elasticsearchService.count().subscribe(
      count => this.totalData = count,
      error => console.log(error)
    );
  }

  loadInfo(code: number, from?: string, to?: string) {
    this.elasticsearchService.get(code, from, to).subscribe(
      data => {
        this.logs = [];
        this.logs = this.logs.concat(data);
        this.rowData = [];
        for (const log of this.logs) {
          this.rowData = this.rowData.concat({
            id: log.id,
            'test number': log.testNo,
            timestamp: log.timestamp,
            'thread name': log.threadName,
            level: log.level,
            'class name': log.loggerName,
            message: log.formattedMessage
          });
        }
        this.rowCount = this.rowData.length;
      },
      error => console.log(error)
    );
  }

  public changeLinks(event: IPageChangeEvent): void {
    this.eventLinks = event;
  }

  evaluateResult() {
    if (this.mavenMessages) {
      this.loadInfo(0);
    } else {
      this.loadInfo(1);
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

  private parseData(day: string, month: string, year: string): string {
    console.log(year + '-' + month + '-' + day);
    return year + '-' + month + '-' + day;
  }
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter/filter.component.html',
})
export class FilterComponent {

  constructor(public dialogRef: MdDialogRef<FilterComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
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

  constructor(public dialogRef: MdDialogRef<SettingsComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
