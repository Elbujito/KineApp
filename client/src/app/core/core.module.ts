import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import {AuthService, PatientsService , BilansService } from './services/index';
import {throwIfAlreadyLoaded, AdminGuard, LoggedGuard, LoggedOffGuard } from './guards/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
	AngularMaterialModule
  ],
  declarations: [
  ],
  providers: [
    AdminGuard,
	LoggedGuard,
	LoggedOffGuard,
	AuthService,
	PatientsService,
	BilansService
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
