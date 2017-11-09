import {NgModule, Type} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule,
  JsonpModule} from '@angular/http';

import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentHttpModule} from '@covalent/http';
import {CovalentMarkdownModule} from '@covalent/markdown';

import {AppComponent} from './app.component';
import {HomeComponent} from './component/home.component';
import {SharedModule} from './shared/shared.module';

import {routing} from './app.routing';
import {ElasticsearchService} from './service/elasticsearch.service';

import {RequestInterceptor} from '../config/interceptor/request.interceptor';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    HttpModule,
    JsonpModule,
    routing,
    SharedModule
  ],
  providers: [
    ElasticsearchService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})

export class AppModule {
}
