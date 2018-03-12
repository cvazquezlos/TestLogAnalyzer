import {HttpClientModule} from '@angular/common/http';
import {
  NgModule,
  Type
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentHttpModule} from '@covalent/http';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {BreadcrumbsModule} from 'ng2-breadcrumbs';
import {CodemirrorModule} from 'ng2-codemirror';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {AddProjectComponent} from './component/add-project/add-project.component';
import {AddExecComponent} from './component/project/add-exec/add-exec.component';
import {ExecComponent} from './component/project/exec/exec.component';
import {
  ReportComparisonComponent,
  ComparisonSettingsComponent
} from './component/project/exec/report-comparison/report-comparison.component';
import {ViewExecComponent} from './component/project/exec/view-exec/view-exec.component';
import {ProjectComponent} from './component/project/project.component';
import {ViewExecsComponent} from './component/project/view-execs/view-execs.component';
import {PublicComponent} from './component/public.component'
import {ViewProjectsComponent} from './component/view-projects/view-projects.component';
import {RequestInterceptor} from '../config/interceptor/request.interceptor';
import {ElasticsearchService} from './service/elasticsearch.service';
import {ExecsStatusService} from './service/execs-status.service';
import {SharedModule} from './shared/shared.module';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

@NgModule({
  declarations: [
    AddExecComponent,
    AddProjectComponent,
    AppComponent,
    ComparisonSettingsComponent,
    ExecComponent,
    ProjectComponent,
    PublicComponent,
    ReportComparisonComponent,
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
    HttpClientModule,
    NgbModule.forRoot(),
    routing,
    SharedModule
  ],
  providers: [
    ElasticsearchService,
    ExecsStatusService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ComparisonSettingsComponent]
})

export class AppModule {
}
