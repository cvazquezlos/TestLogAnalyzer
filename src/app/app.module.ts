import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from 'ag-grid-angular/main';

import {AppComponent} from './app.component';
import {RedComponentComponent} from './red-component/red-component.component';

@NgModule({
    declarations: [
        AppComponent,
        RedComponentComponent
    ],
    imports: [
      NgbModule.forRoot(),
        BrowserModule,
        AgGridModule.withComponents(
            [RedComponentComponent]
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
