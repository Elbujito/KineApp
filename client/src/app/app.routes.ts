import {CoreComponent} from './core/core.component';
import {AboutComponent} from './components/about/about.component';
import {SupportComponent} from './components/support/support.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
import {ExplorerComponent} from './components/explorer/explorer.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
      path: 'login',
      component: LoginComponent,
      children: []
  },
  {
    path: 'core',
    component: CoreComponent,
    children: []
  },
  {
      path: 'explorer',
      component: ExplorerComponent,
      children: []
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'support',
    component: SupportComponent
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
