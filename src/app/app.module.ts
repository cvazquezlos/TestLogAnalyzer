import {AgGridModule} from 'ag-grid-angular/main';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {ConfigComponent} from './component/config/config.component';
import {FooterComponent} from './component/footer/footer.component';
import {HeaderComponent} from './component/header/header.component';
import {HomeComponent} from './component/home.component';

import {routing} from './app.routing';

import {ElasticsearchService} from './service/elasticsearch.service';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
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
    NgbModule,
    routing
  ],
  providers: [
    ElasticsearchService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
