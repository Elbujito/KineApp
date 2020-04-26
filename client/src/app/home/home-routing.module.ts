import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../shared/index';
import { HomeComponent, ContactComponent } from './index';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: []
  },
  {
    path: 'contact',
    component: ContactComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
