import {NgModule, Type} from '@angular/core';
import {HttpModule, JsonpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentHttpModule, IHttpInterceptor} from '@covalent/http';
import {CovalentMarkdownModule} from '@covalent/markdown';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AgGridModule} from 'ag-grid-angular/main';

import {AppComponent} from './app.component';
import {ConfigComponent} from './component/config/config.component';
import {FooterComponent} from './component/footer/footer.component';
import {HeaderComponent} from './component/header/header.component';
import {HomeComponent} from './component/home.component';

import {routing} from './app.routing';
import {ElasticsearchService} from './service/elasticsearch.service';

import {RequestInterceptor} from '../config/interceptor/request.interceptor';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

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
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
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
