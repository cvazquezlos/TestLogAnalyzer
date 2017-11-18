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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit {

  active = false;
  aux: Log[] = [];
  classes: any[] = [];
  dataColumnDefs: ITdDataTableColumn[] = [
    {name: 'id', label: 'id', sortable: true, width: 100},
    {name: 'timestamp', label: 'timestamp', width: 230},
    {name: 'thread', label: 'thread', width: 100},
    {name: 'level', label: 'level', width: 100},
    {name: 'class', label: 'class', width: 220},
    {name: 'method', label: 'method', width: 150},
    {name: 'message', label: 'message', width: 600}
  ];
  dataRowData: any[] = [];
  dataSortBy = 'id';
  dataSortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  filteredTotal = 0;
  idSelected: number;
  logs: Log[] = [];
  mavenMessages = false;
  methods: any[] = [];
  navmenu: any[] = [];
  searchTerm = '';

  constructor(private elasticsearchService: ElasticsearchService, private _dataTableService: TdDataTableService,
              private ref: ChangeDetectorRef, public media: TdMediaService) {
    this.countExecs(0);
  }

  maven(): void {
    this.mavenMessages = !this.mavenMessages;
    console.log('Show Maven messages: ' + this.mavenMessages);
    console.log('Updating data...');
    if (this.isSelected()) {
      this.loadInfo(0, undefined);
    }
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

  private cleanWholeNav() {
    for (const options of this.navmenu) {
      options.icon = 'check_box_outline_blank';
      for (const classI of options.classes) {
        for (const method of classI.methods) {
          method.icon = 'check_box_outline_blank';
        }
      }
    }
  }

  private countExecs(index: number) {
    this.elasticsearchService.count(2, (index + 1).toString()).subscribe(
      count => {
        if (count !== 0) {
          this.countExecs(index + 1);
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
        'icon': 'check_box_outline_blank',
        'title': 'Exec ' + id.toString(),
        'tip': 'Display exec no ' + id.toString(),
        'classes': []
      });
      this.loadNavbarInfo(id, i);
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

  private isSelected(): boolean {
    for (const option of this.navmenu) {
      if (option.icon === 'check_box') {
        return true;
      }
    }
    return false;
  }

  private loadNavbarInfo(value: string, index: number) {
    this.elasticsearchService.get(3, 73, value, false).subscribe(
      data => {
        console.log('Loading execution number ' + value + ' classes...');
        this.aux = [];
        this.aux = this.aux.concat(data);
        let id = 0;
        for (const classInd of this.aux) {
          if (classInd.formatted_message.split(' ').length !== 2) {
            continue;
          }
          let msg = classInd.formatted_message;
          this.navmenu[index].classes = this.navmenu[index].classes.concat({
            'name': msg.split(' ')[1],
            'shortname': msg.split(' ')[1].split('.')[msg.split(' ')[1].split('.').length - 1],
            'methods': []
          });
          id += 1;
        }
        console.log('Classes of execution ' + value + ' displayed.');
        this.elasticsearchService.get(1, 1000, value, false).subscribe(
          data1 => {
            console.log('Loading test names of each execution ' + value + ' class...');
            this.methods = [];
            let logs: Log[] = [];
            logs = logs.concat(data1);
            for (const log of logs) {
              const args = log.formatted_message.split(' ');
              if ((this.methods.indexOf(args[1]) === -1) && (args[2] === 'method')) {
                this.methods = this.methods.concat(args[1]);
              }
            }
            console.log('Names loaded. Adding each method to its class...');
            for (const logger of this.navmenu[index].classes) {
              for (const method of this.methods) {
                this.elasticsearchService.count(3, value, method.replace('(', '').replace(')', ''), logger.name).subscribe(
                  data2 => {
                    if (data2 !== 0) {
                      logger.methods = logger.methods.concat({
                        'name': method,
                        'icon': 'check_box_outline_blank'
                      });
                    }
                  }
                );
              }
            }
            console.log('Test names added.')
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  private loadInfo(code: number, value?: string, method?: string) {
    console.log('Sending request to your Elasticsearch instance...');
    let meth = method;
    if (value) {
      this.idSelected = +value;
      if (method) {
        this.updateIcon(value, method);
        meth = method.replace('(', '').replace(')', '');
      } else {
        this.updateIcon(value);
      }
      this.active = true;
    }
    this.elasticsearchService.get(code, 1000, this.idSelected.toString(), this.mavenMessages, meth).subscribe(
      data => {
        console.log('Response received. Parsing data...');
        this.logs = [];
        this.logs = this.logs.concat(data);
        this.dataRowData = [];
        for (const log of this.logs) {
          this.dataRowData = this.dataRowData.concat({
            'id': (+log.id),
            'timestamp': log.timestamp,
            'thread': log.thread_name,
            'level': log.level,
            'class': (log.logger_name.split('.')[log.logger_name.split('.').length - 1]),
            'method': log.method,
            'message': log.formatted_message
          });
        }
        console.log('Data parsed and displayed.');
      },
      error => console.log(error)
    );
  }

  private updateIcon(id: string, method?: string) {
    this.cleanWholeNav();
    for (const option of this.navmenu) {
      if (option.id === id) {
        if (method !== undefined) {
          for (const classI of option.classes) {
            for (const meth of classI.methods) {
              if (meth.name === method) {
                meth.icon = 'check_box';
              }
            }
          }
        } else {
          option.icon = 'check_box';
        }
      }
    }
  }
}
