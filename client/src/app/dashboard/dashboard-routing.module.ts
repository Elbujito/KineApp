import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    DashboardComponent,
    PatientListComponent,
	LayoutComponent,
	ProfileComponent
} from './components/index';

import { LoggedGuard, LoggedOffGuard } from '../auth/guards/index';

const routes: Routes = [
  {
      path: 'home',
      component: HomeComponent,
      children: []
  },
  {
        path: '',
        component: HomeComponent,
        children: []
  },
  {
      path: 'dashboard',
      component: LayoutComponent,
      children: [
        { path: '', component: DashboardComponent },
      ],
      canActivate: [LoggedGuard],
  },
  {
        path: 'profile',
        component: LayoutComponent,
        children: [
          { path: '', component: ProfileComponent },
        ],
        canActivate: [LoggedGuard],
  },
  {
      path: 'layout',
      component: LayoutComponent,
      children: []
  },
  {
      path: 'about',
      component: LayoutComponent,
      children: [
        { path: '', component: AboutComponent },
      ],
  },
  {
      path: 'patients',
      component: LayoutComponent,
      children: [
        { path: '', component: PatientListComponent },
      ],
      canActivate: [LoggedGuard],
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
