import {AgGridModule} from "ag-grid-angular/main";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./component/header/header.component";
import {HomeComponent} from "./component/home.component";
import {RedComponentComponent} from "./red-component/red-component.component";

import {routing} from "./app.routing";

import {ElasticsearchService} from "./service/elasticsearch.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RedComponentComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents(
      [RedComponentComponent]
    ),
    routing
  ],
  providers: [
    ElasticsearchService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
