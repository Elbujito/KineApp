import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import {AuthService, WindowService, AuthFirebaseService, PatientsService , BilansService, AlertService, UserFirebaseService } from './services/index';
import {throwIfAlreadyLoaded, AdminGuard, LoggedGuard, LoggedOffGuard, AuthFirebaseGuard } from './guards/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
  ],
  providers: [
    AdminGuard,
	LoggedGuard,
	LoggedOffGuard,
	AuthFirebaseGuard,
	AuthService,
	PatientsService,
	BilansService,
	AlertService,
	WindowService,
	AuthFirebaseService,
	UserFirebaseService
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
