import {RouterModule, Routes} from '@angular/router';
import {AddExecComponent} from './component/project/add-exec/add-exec.component';
import {AddProjectComponent} from './component/add-project/add-project.component';
import {ComparisonComponent} from './component/comparison/comparison.component';
import {PublicComponent} from './component/public.component';
import {ViewExecsComponent} from './component/project/view-execs/view-execs.component';
import {ViewExecComponent} from './component/project/view-exec/view-exec.component';
import {ViewProjectsComponent} from './component/view-projects/view-projects.component';
import {ProjectComponent} from "./component/project/project.component";

export const appRoutes: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'projects', component: PublicComponent,
    children: [
      {path: '', component: ViewProjectsComponent},
      {path: 'add', component: AddProjectComponent},
      {path: ':project', component: ProjectComponent,
        children: [
          {path: '', component: ViewExecsComponent},
          {path: 'add', component: AddExecComponent},
          {path: ':exec', component: ViewExecComponent}
        ]
      },
      {path: 'comparison', component: ComparisonComponent}
    ]
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
