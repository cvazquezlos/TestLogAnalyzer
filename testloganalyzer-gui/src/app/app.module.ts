import {HttpClientModule} from '@angular/common/http';
import {NgModule, Type} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentHttpModule} from '@covalent/http';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {BreadcrumbsModule} from 'ng2-breadcrumbs';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {AddProjectComponent} from './component/add-project/add-project.component';
import {AddExecComponent} from './component/project/add-exec/add-exec.component';
import {ExecComponent} from './component/project/exec/exec.component';
import {ReportComparisonComponent} from './component/project/exec/report-comparison/report-comparison.component';
import {ProjectComponent} from './component/project/project.component';
import {ViewExecsComponent} from './component/project/view-execs/view-execs.component';
import {PublicComponent} from './component/public.component'
import {ViewProjectsComponent} from './component/view-projects/view-projects.component';
import {RequestInterceptor} from '../config/interceptor/request.interceptor';
import {ElasticsearchService} from './service/elasticsearch.service';
import {TableService} from './service/table.service';
import {SharedModule} from './shared/shared.module';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

@NgModule({
  declarations: [
    AddExecComponent,
    AddProjectComponent,
    AppComponent,
    ExecComponent,
    ProjectComponent,
    PublicComponent,
    ReportComparisonComponent,
    ViewExecsComponent,
    ViewProjectsComponent,
  ],
  imports: [
    BreadcrumbsModule,
    BrowserAnimationsModule,
    BrowserModule,
    CovalentHighlightModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentMarkdownModule,
    HttpClientModule,
    NgbModule.forRoot(),
    routing,
    SharedModule
  ],
  providers: [
    ElasticsearchService,
    TableService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})

export class AppModule {
}
