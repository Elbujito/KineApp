import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    DashboardComponent
} from './components/index';

import { LoggedGuard, LoggedOffGuard } from '../auth/guards/index';

const routes: Routes = [
  {
      path: 'home',
      component: HomeComponent,
      canActivate: [LoggedOffGuard],
      children: []
  },
  {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [LoggedOffGuard],
      children: []
  },
  {
    path: 'about',
    component: AboutComponent,
    children: []
  },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class DashboardRoutingModule {}
