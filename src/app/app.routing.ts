import {RouterModule} from '@angular/router';

import {ConfigComponent} from './component/config/config.component';
import {HomeComponent} from './component/home.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'config', component: ConfigComponent},
]

export const routing = RouterModule.forRoot(appRoutes);
