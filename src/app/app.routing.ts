import {RouterModule, Routes} from '@angular/router';
import {AddProjectComponent} from './component/add-project/add-project.component';
import {AddExecComponent} from './component/project/add-exec/add-exec.component';
import {ExecComponent} from './component/project/exec/exec.component';
import {ReportComparisonComponent} from './component/project/exec/report-comparison/report-comparison.component';
import {ViewExecComponent} from './component/project/exec/view-exec/view-exec.component';
import {ViewExecsComponent} from './component/project/view-execs/view-execs.component';
import {ProjectComponent} from './component/project/project.component';
import {PublicComponent} from './component/public.component';
import {ViewProjectsComponent} from './component/view-projects/view-projects.component';

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
          {path: ':exec', component: ExecComponent,
            children: [
              {path: '', component: ViewExecComponent},
              {path: 'report', component: ReportComparisonComponent}
            ]
          }
        ]
      }
    ]
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
