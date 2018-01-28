import {RouterModule} from '@angular/router';

import {HomeComponent} from './component/home.component';

import {AddProjectComponent} from './component/add-project/add-project.component';
import {ComparisonComponent} from './component/comparison/comparison.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddProjectComponent},
  {path: 'comparison', component: ComparisonComponent}
]

export const routing = RouterModule.forRoot(appRoutes);
