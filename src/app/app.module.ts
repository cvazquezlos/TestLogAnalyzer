import {NgModule, Type} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule,
  JsonpModule} from '@angular/http';
import {CodemirrorModule} from 'ng2-codemirror';
import {DiffMatchPatchModule} from 'ng-diff-match-patch';

import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentHttpModule} from '@covalent/http';
import {CovalentMarkdownModule} from '@covalent/markdown';

import {AppComponent} from './app.component';
import {ComparisonComponent} from './component/comparison/comparison.component';
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
    ComparisonComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    DiffMatchPatchModule,
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
