import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent, NavbarComponent, FooterComponent } from './index';

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
	NavbarComponent,
	FooterComponent
  ],
  entryComponents: [
  ]
})
export class HomeModule { }
