import {Component} from '@angular/core';
import {RedComponentComponent} from '../red-component/red-component.component';

import {GridOptions} from 'ag-grid/main';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  showGrid: boolean;
  gridOptions: GridOptions;
  columnDefs: any[]
  rowData: any[];

  constructor() {
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
