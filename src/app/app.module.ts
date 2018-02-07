import {NgModule, Type} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentHttpModule} from '@covalent/http';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {DiffMatchPatchModule} from 'ng-diff-match-patch';
import {BreadcrumbsModule} from 'ng2-breadcrumbs';
import {CodemirrorModule} from 'ng2-codemirror';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {PublicComponent} from './component/public.component'
import {AddProjectComponent} from './component/add-project/add-project.component';
import {ViewProjectsComponent} from './component/view-projects/view-projects.component';
import {ProjectComponent} from './component/project/project.component';
import {AddExecComponent} from './component/project/add-exec/add-exec.component';
import {ViewExecsComponent} from './component/project/view-execs/view-execs.component';
import {ViewExecComponent} from './component/project/view-exec/view-exec.component';
import {ComparisonComponent} from './component/comparison/comparison.component';
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
    AddExecComponent,
    AddProjectComponent,
    AppComponent,
    ComparisonComponent,
    ProjectComponent,
    PublicComponent,
    ViewExecComponent,
    ViewExecsComponent,
    ViewProjectsComponent,
  ],
  imports: [
    BreadcrumbsModule,
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
    NgbModule.forRoot(),
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
