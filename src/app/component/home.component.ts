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
  templateUrl: './home.component.html'
})

export class HomeComponent {

  comparisonAux: any[];
  comparisonColumnDefs: ITdDataTableColumn[];
  comparisonRowData: any[];
  comparisonShow: boolean;

  dataClickable: boolean;
  dataColumnDefs: ITdDataTableColumn[];
  dataCurrentPage: number;
  dataMultiple: boolean;
  dataPageSize: number;
  dataRowData: any[];
  dataSelectable: boolean;
  dataSelectedRows: Log[] = [];
  dataSortBy: string;
  dataSortOrder: TdDataTableSortingOrder;
  dataTotalData: number;

  eventLinks: IPageChangeEvent;
  filteredData: any[];
  filteredTotal: number;
  fromDate: Date;
  logs: Log[];
  mavenMessages: boolean;
  rowCount: number;
  rowClicked: Log;
  searchTerm: string;
  selectedLog: Log;
  subtitle: string;
  toDate: Date;

  wholeData: any[];

  constructor(private elasticsearchService: ElasticsearchService, public dialog: MatDialog,
              private _dialogService: TdDialogService, private _dataTableService: TdDataTableService) {
    this.dataColumnDefs = [
      {name: 'test',       label: 'test'},
      {name: 'id',         label: 'id', sortable: true},
      {name: 'timestamp',  label: 'timestamp', width: 130},
      {name: 'thread',     label: 'thread'},
      {name: 'level',      label: 'level'},
      {name: 'class name', label: 'class', width: 500},
      {name: 'message',    label: 'message', width: { min: 500, max: 700 }}
    ];
    this.comparisonColumnDefs = [
      {name: 'id',         label: 'id'},
      {name: 'timestamp',  label: 'timestamp', width: 220},
      {name: 'thread',     label: 'thread'},
      {name: 'level',      label: 'level'},
      {name: 'class name', label: 'class', width: 500},
      {name: 'message',    label: 'message', width: { min: 500, max: 700 }}
    ];
    this.comparisonShow = false;
    this.comparisonRowData = [];
    this.dataClickable = true;
    this.dataCurrentPage = 1;
    this.dataMultiple = true;
    this.dataPageSize = 50;
    this.dataSelectable = true;
    this.dataSortBy = 'id';
    this.dataSortOrder = TdDataTableSortingOrder.Descending;

    this.searchTerm = '';
    this.subtitle = '';

    this.countLogs(1);
    this.logs = [];
    this.loadInfo(1);

    this.wholeData = [];
    this.loadInfo(4);
  }

  changeLinks(event: IPageChangeEvent): void {
    this.eventLinks = event;
    this.dataPageSize = event.pageSize;
    this.dataCurrentPage = event.page;
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
    let newData: any[] = this.wholeData;
    const excludedColumns: string[] = this.dataColumnDefs
      .filter((column: ITdDataTableColumn) => {
        return ((column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false));
      }).map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.dataSortBy, this.dataSortOrder);
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
    this.dataSortBy = sortEvent.name;
    this.dataSortOrder = sortEvent.order;
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
    this.comparisonRowData = [];
    let logs: any[];
    if (this.selectedLog !== this.rowClicked) {
      logs = [this.selectedLog, this.rowClicked];
      for (const log of logs) {
        this.comparisonRowData = this.comparisonRowData.concat({
          'id'        : log.id,
          'timestamp' : log.timestamp,
          'thread'    : log.threadName,
          'level'     : log.level,
          'class name': log.loggerName,
          'message'   : log.formattedMessage
        });
      }
    } else {
      this.loadInfo(3, this.selectedLog.formattedMessage);
    }
    this.comparisonShow = true;
  }

  private countLogs(code: number) {
    this.elasticsearchService.count(code).subscribe(
      count => this.dataTotalData = count,
      error => console.log(error)
    );
  }

  private findById(id: number): any {
    for (const log of this.logs) {
      if (+id === +log.id) {
        return log;
      }
    }
    return -1;
  }

  private loadInfo(code: number, from?: string, to?: string) {
    let page = (this.dataCurrentPage * this.dataPageSize) - this.dataPageSize;
    if (page < 0) {
      page = 0;
    }
    this.elasticsearchService.submit(code, this.dataPageSize, page, from, to).subscribe(
      data => {
        if (code === 3) {
          this.comparisonAux = [];
          this.comparisonAux = this.comparisonAux.concat(data);
          this.comparisonRowData = [];
          for (const log of this.comparisonAux) {
            this.comparisonRowData = this.comparisonRowData.concat({
              'id'        : (+log.id),
              'timestamp' : log.timestamp,
              'thread'    : log.threadName,
              'level'     : log.level,
              'class name': log.loggerName,
              'message'   : log.formattedMessage
            });
          }
        } else {
          if (code === 4) {
            this.wholeData = this.wholeData.concat(data);
          } else {
            this.logs = [];
            this.logs = this.logs.concat(data);
            this.dataRowData = [];
            for (const log of this.logs) {
              this.dataRowData = this.dataRowData.concat({
                id: (+log.id),
                'test': (+log.testNo),
                timestamp: (log.timestamp.split(' '))[0],
                'thread': log.threadName,
                level: log.level,
                'class name': log.loggerName,
                message: log.formattedMessage
              });
            }
            this.rowCount = this.dataRowData.length;
          }
        }
      },
      error => console.log(error)
    );
  }

  private parseData(day: string, month: string, year: string): string {
    return year + '-' + month + '-' + day ;
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
