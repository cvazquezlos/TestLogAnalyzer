import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgGridModule} from 'ag-grid-angular/main';

import {AppComponent} from './app.component';
import {HomeComponent} from './component/home.component';
import {RedComponentComponent} from './red-component/red-component.component';

import {routing} from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RedComponentComponent
    ],
    imports: [
        BrowserModule,
        AgGridModule.withComponents(
            [RedComponentComponent]
        ),
        routing
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}
