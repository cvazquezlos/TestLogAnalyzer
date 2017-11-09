import {
  AfterViewInit,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder,
  TdMediaService
} from '@covalent/core';

import {Log} from '../model/source.model';
import {ElasticsearchService} from '../service/elasticsearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements AfterViewInit {

  dataClickable = true;
  dataColumnDefs: ITdDataTableColumn[] = [
    {name: 'id', label: 'id', sortable: true},
    {name: 'timestamp', label: 'timestamp', width: 130},
    {name: 'thread', label: 'thread'},
    {name: 'level', label: 'level'},
    {name: 'class', label: 'class', width: 500},
    {name: 'message', label: 'message', width: {min: 500, max: 700}}
  ];
  dataCurrentPage = 1;
  dataMultiple = true;
  dataPageSize = 50;
  dataRowData: any[] = [];
  dataSelectable = true;
  dataSelectedRows: Log[] = [];
  dataSortBy = 'id';
  dataSortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  dataTotalData = 0;

  eventLinks: IPageChangeEvent;
  filteredTotal = 0;
  fromDate: Date;
  index: number;
  logs: Log[] = [];
  mavenMessages = false;
  rowCount = 0;
  searchTerm = '';
  toDate: Date;

  navmenu: Object[] = [];

  constructor(private elasticsearchService: ElasticsearchService, private _dataTableService: TdDataTableService,
              private ref: ChangeDetectorRef, public media: TdMediaService) {
    this.countExecs(0);
  }

  private countExecs(index: number) {
    this.elasticsearchService.count(2, (index + 1).toString()).subscribe(
      count => {
        if (count !== 0) {
          this.countExecs(index+1);
        } else {
          this.createNav(index);
        }
      },
      error => console.log(error)
    );
  }

  private createNav(index: number) {
    for (let i = 0; i < index; i++) {
      this.navmenu = this.navmenu.concat({
        'icon': 'looks_one',
        'route': '.',
        'title': 'First item',
        'description': 'Item description'
      });
    }
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    setTimeout(() => { // workaround since MatSidenav has issues redrawing at the beggining
      this.media.broadcast();
      this.ref.detectChanges();
    });
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
      this.count(0, '');
    } else {
      this.loadInfo(1);
      this.count(1, '');
    }
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.dataSortBy = sortEvent.name;
    this.dataSortOrder = sortEvent.order;
    this.filter();
  }

  private count(code: number, value: string) {
    this.elasticsearchService.count(code, value).subscribe(
      count => {
        console.log(count);
      },
      error => console.log(error)
    );
  }

  private filter(): void {
    let newData: any[] = this.dataRowData;
    this.dataRowData = [];
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.dataSortBy, this.dataSortOrder);
    for (const log of newData) {
      this.dataRowData = this.dataRowData.concat(log);
    }
    this.ref.detectChanges();
  }

  private loadInfo(code: number) {
    let page = (this.dataCurrentPage * this.dataPageSize) - this.dataPageSize;
    if (page < 0) {
      page = 0;
    }
    this.elasticsearchService.submit(code, this.dataPageSize, page).subscribe(
      data => {
        this.logs = [];
        this.logs = this.logs.concat(data);
        this.dataRowData = [];
        for (const log of this.logs) {
          this.dataRowData = this.dataRowData.concat({
            'id': (+log.id),
            'timestamp': log.timestamp,
            'thread': log.thread_name,
            'level': log.level,
            'class': log.logger_name,
            'message': log.formatted_message
          });
        }
        this.rowCount = this.dataRowData.length;
      },
      error => console.log(error)
    );
  }
}
