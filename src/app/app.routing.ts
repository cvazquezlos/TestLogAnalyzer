import {RouterModule} from '@angular/router';

import {HomeComponent} from './component/home.component';
import {ComparisonComponent} from "./component/comparison/comparison.component";

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'comparison', component: ComparisonComponent}
]

export const routing = RouterModule.forRoot(appRoutes);
