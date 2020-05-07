import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutHomeComponent } from './index';

const routes: Routes = [
  {
    path: '',
    component: AboutHomeComponent,
    children: [],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
