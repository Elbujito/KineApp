import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, NotFoundComponent, AboutComponent, HomeComponent } from './dashboard/index';
import { LoggedGuard, LoggedOffGuard} from './auth/index';

export const routes = [
  {
      path: '',
      component: HomeComponent,
      canActivate: [LoggedOffGuard]
  },
  {
          path: 'login',
          component: HomeComponent,
          canActivate: [LoggedOffGuard]
  },
  {
        path: 'home',
        component: HomeComponent,
        canActivate: [LoggedOffGuard]
   },
   {
           path: 'about',
           component: AboutComponent,
  },
  {
        path: 'not-found',
        component: NotFoundComponent,
        children: []
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
