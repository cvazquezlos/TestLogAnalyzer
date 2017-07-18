import {Component} from '@angular/core';
import {GridOptions} from 'ag-grid/main';

import {ElasticService} from './service/elastic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private gridOptions: GridOptions;
  private showGrid: boolean;
  private rowData: any[];
  private columnDefs: any[];
  private rowCount: string;

  constructor(private elasticService: ElasticService) {
    this.gridOptions = <GridOptions>{};
    this.rowData = [{
      timestamp: 12345,
      message: "uhu",
      level: "error",
      path: "hhh"
    }];
    this.list();
    this.createColumnDefs();
    this.showGrid = true;
  }

  /* rowData:any[];
   gridOptions = {
   columnDefs: this.columnDefs,
   enableFilter: true,
   enableSorting: true,
   showToolPanel: true
   };
   columnDefs =
   function() {
   let poni=[]
   this.rowData.forEach(log=>{
   poni.push(Object.getOwnPropertyNames(log))
   });
   console.log(poni);
   return poni;
   };*/


  list() {
    /*
    this.elasticService.listIndices()
      .subscribe(list => {
        let todos: Array<any> = [];
        list.forEach(index => {
          this.elasticService.listAllLogs(index)
            .subscribe(data => {
              todos = todos.concat(data);
              console.log(todos);
              this.rowData = todos;
              this.gridOptions.api.setRowData(todos);
            })
        });

      });*/
  }

  private calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      var model = this.gridOptions.api.getModel();
      var totalRows = this.rowData.length;
      var processedRows = model.getRowCount();
      this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
  }

  private onModelUpdated() {
    console.log('onModelUpdated');
    this.calculateRowCount();
  }

  private onReady() {
    console.log('onReady');
    this.calculateRowCount();
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: '@timestamp'
      },
      {
        headerName: 'message'
      },
      {
        headerName: 'logger_name'
      },
      {
        headerName: 'level'
      },
      {
        headerName: 'path'
      }
    ];
  }
}
