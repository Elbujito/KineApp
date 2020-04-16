import {CoreComponent} from './core/core.component';
import {AboutComponent} from './components/about/about.component';
import {SupportComponent} from './components/support/support.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'core',
    pathMatch: 'full'
  },
  {
    path: 'core',
    component: CoreComponent,
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
