import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { AboutHomeComponent } from './index';

@NgModule({
  declarations: [AboutHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AboutRoutingModule,
	AngularMaterialModule
  ]
})
export class AboutModule { }
