import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { ProfileComponent, ProfileDetailsComponent } from './index';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
	AuthModule,
	AngularMaterialModule
  ],
  declarations: [
    ProfileComponent,
	ProfileDetailsComponent
  ],
  entryComponents: [
  ]
})
export class ProfileModule { }
