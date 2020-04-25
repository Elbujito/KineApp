import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { HomeRoutingModule } from './home-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { HomeComponent, NavbarComponent, FooterComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
	AuthModule,
    SharedModule,
	AngularMaterialModule
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
