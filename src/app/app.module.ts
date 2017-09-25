import {NgModule, Type} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule, JsonpModule} from '@angular/http';
import {MdDialogModule} from "@angular/material";

import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentHttpModule, IHttpInterceptor} from '@covalent/http';
import {CovalentMarkdownModule} from '@covalent/markdown';

import {AgGridModule} from 'ag-grid-angular/main';

import {AppComponent} from './app.component';
import {FooterComponent} from './component/footer/footer.component';
import {HeaderComponent} from './component/header/header.component';
import {HomeComponent} from './component/home.component';
import {SettingsComponent} from "./component/home.component";
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
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SettingsComponent
  ],
  imports: [
    AgGridModule.withComponents(
      [HomeComponent]
    ),
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
    MdDialogModule,
    routing,
    SharedModule
  ],
  providers: [
    ElasticsearchService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SettingsComponent]
})

export class AppModule {
}
