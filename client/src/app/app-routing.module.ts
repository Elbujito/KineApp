import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, NotFoundComponent, AboutComponent } from './dashboard/index';
import { LoggedGuard, LoginComponent } from './auth/index';

export const routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
      path: 'login',
      component: LoginComponent,
	  canActivate: [LoggedGuard],
      children: []
  },
  {
      path: 'dashboard',
      component: DashboardComponent,
	  canActivate: [LoggedGuard],
      children: []
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
