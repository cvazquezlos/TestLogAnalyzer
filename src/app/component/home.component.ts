import {Component} from "@angular/core";
import {RedComponentComponent} from "../red-component/red-component.component";
import {GridOptions} from "ag-grid/main";

import {Log} from "../model/log.model";
import {Response} from "../model/response.model";

import {ElasticsearchService} from "../service/elasticsearch.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  response: Response;
  logs: Log[];
  showGrid: boolean;
  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  constructor(private elasticsearchService: ElasticsearchService) {
    this.gridOptions = <GridOptions>{};
    this.columnDefs = [
      {headerName: 'Make', field: 'make'},
      {headerName: 'Model', field: 'model', cellRendererFramework: RedComponentComponent},
      {headerName: 'Price', field: 'price'}
    ];
    this.rowData = [
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000}
    ];
    this.showGrid = true;
    this.logs = [];
    this.addLogs();
  }

  addLogs() {
    let todos: any[];
    todos = [];
    this.elasticsearchService.listAllLogs()
      .subscribe(data => {
        todos = todos.concat(data);
        console.log(todos[0]);
        /*this.rowData = todos;
        this.gridOptions.api.setRowData(todos);*/
      })
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }
}
