import {NgModule, Type} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {CodemirrorModule} from 'ng2-codemirror';
import {DiffMatchPatchModule} from 'ng-diff-match-patch';

import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentHttpModule} from '@covalent/http';
import {CovalentMarkdownModule} from '@covalent/markdown';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {AddProjectComponent} from './component/add-project/add-project.component';
import {ComparisonComponent} from './component/comparison/comparison.component';
import {HomeComponent} from './component/home.component';

import {DiffService} from './service/diff.service';
import {ElasticsearchService} from './service/elasticsearch.service';
import {ExecsStatusService} from './service/execs-status.service';
import {SharedModule} from './shared/shared.module';

import {RequestInterceptor} from '../config/interceptor/request.interceptor';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

@NgModule({
  declarations: [
    AddProjectComponent,
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
    HttpClientModule,
    routing,
    SharedModule
  ],
  providers: [
    DiffService,
    ElasticsearchService,
    ExecsStatusService,
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})

export class AppModule {
}
