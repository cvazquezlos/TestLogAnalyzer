import {RouterModule} from "@angular/router";

import {HomeComponent} from "./component/home.component";

const appRoutes = [
  {path: '', component: HomeComponent}
]

export const routing = RouterModule.forRoot(appRoutes);
