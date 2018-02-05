import {RouterModule} from '@angular/router';

import {HomeComponent} from './component/home.component';

import {AddExecComponent} from './component/add-exec/add-exec.component';
import {AddProjectComponent} from './component/add-project/add-project.component';
import {ComparisonComponent} from './component/comparison/comparison.component';
import {ProjectComponent} from './component/project/project.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddProjectComponent},
  {path: 'comparison', component: ComparisonComponent},
  {path: ':project', component: ProjectComponent},
  {path: ':project/add-exec', component: AddExecComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
