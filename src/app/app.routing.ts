import {RouterModule} from '@angular/router';

import {HomeComponent} from './component/home.component';

import {AddExecComponent} from './component/add-exec/add-exec.component';
import {AddProjectComponent} from './component/add-project/add-project.component';
import {ComparisonComponent} from './component/comparison/comparison.component';
import {ViewProjectComponent} from './component/view-project/view-project.component';
import {ViewExecComponent} from './component/view-exec/view-exec.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddProjectComponent},
  {path: 'comparison', component: ComparisonComponent},
  {path: ':project', component: ViewProjectComponent},
  {path: ':project/add-exec', component: AddExecComponent},
  {path: ':project/:exec', component: ViewExecComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
