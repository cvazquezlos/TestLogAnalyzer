import {AgGridModule} from 'ag-grid-angular/main';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FooterComponent} from './component/footer/footer.component';
import {HeaderComponent} from './component/header/header.component';
import {HomeComponent} from './component/home.component';

import {routing} from './app.routing';

import {ElasticsearchService} from './service/elasticsearch.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    AgGridModule.withComponents(
      [HomeComponent]
    ),
    BrowserModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [
    ElasticsearchService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
