import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent, ContactComponent, CarouselComponent} from './index';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
	AuthModule,
    SharedModule,
	MaterialModule
  ],
  declarations: [
    HomeComponent,
	ContactComponent,
	CarouselComponent
  ],
  entryComponents: [
  ]
})
export class HomeModule { }
