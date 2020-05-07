import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material.module';

import { HomeComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
	MaterialModule
  ],
  declarations: [HomeComponent],
  entryComponents: []
})
export class HomeModule { }
