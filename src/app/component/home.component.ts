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

  active = false;

  dataColumnDefs: ITdDataTableColumn[] = [
    {name: 'id', label: 'id', sortable: true, width: 100},
    {name: 'timestamp', label: 'timestamp', width: 230},
    {name: 'thread', label: 'thread', width: 100},
    {name: 'level', label: 'level', width: 100},
    {name: 'class', label: 'class', width: 220},
    {name: 'method', label: 'method', width: 150},
    {name: 'message', label: 'message', width: 800}
  ];
  dataRowData: any[] = [];
  dataSortBy = 'id';
  dataSortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  filteredTotal = 0;
  logs: Log[] = [];
  mavenMessages = false;
  searchTerm = '';

  navmenu: Object[] = [];

  constructor(private elasticsearchService: ElasticsearchService, private _dataTableService: TdDataTableService,
              private ref: ChangeDetectorRef, public media: TdMediaService) {
    this.countExecs(0);
  }

  maven(): void {
    this.mavenMessages = !this.mavenMessages;
    console.log("Show Maven messages: " + this.mavenMessages);
    console.log("Updating data...");
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    setTimeout(() => { // workaround since MatSidenav has issues redrawing at the beggining
      this.media.broadcast();
      this.ref.detectChanges();
    });
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.dataSortBy = sortEvent.name;
    this.dataSortOrder = sortEvent.order;
    this.filter();
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
    let id;
    for (let i = 0; i < index; i++) {
      id = i + 1;
      this.navmenu = this.navmenu.concat({
        'id': id,
        'icon': 'looks_one',
        'title': 'Exec ' + id.toString()
      });
    }
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

  private loadInfo(code: number, value?: string) {
    console.log("Sending request to your Elasticsearch instance...");
    this.elasticsearchService.get(code, 73, value, this.mavenMessages).subscribe(
      data => {
        console.log("Response received. Parsing data...")
        this.logs = [];
        this.logs = this.logs.concat(data);
        this.dataRowData = [];
        for (const log of this.logs) {
          this.dataRowData = this.dataRowData.concat({
            'id': (+log.id),
            'timestamp': log.timestamp,
            'thread': log.thread_name,
            'level': log.level,
            'class': (log.logger_name.split('.')[log.logger_name.split('.').length-1]),
            'method': log.method,
            'message': log.formatted_message
          });
        }
        console.log("Data parsed and displayed.")
      },
      error => console.log(error)
    );
  }
}
