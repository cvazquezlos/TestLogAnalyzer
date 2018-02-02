import {RouterModule} from '@angular/router';

import {HomeComponent} from './component/home.component';

import {AddProjectComponent} from './component/add-project/add-project.component';
import {ComparisonComponent} from './component/comparison/comparison.component';
import {ProjectComponent} from './component/project/project.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddProjectComponent},
  {path: ':project', component: ProjectComponent},
  {path: 'comparison', component: ComparisonComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
