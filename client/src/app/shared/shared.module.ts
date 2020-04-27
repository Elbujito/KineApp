import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent, NotFoundComponent, HeaderComponent, FooterComponent} from './components/index';
import { UsernamePipe, TitleCasePipeComponent } from './pipes/index';

import { AuthService, AuthFirebaseService, PatientsService , BilansService, AlertService, UserFirebaseService } from './services/index';
import { LoggedGuard, LoggedOffGuard, AuthFirebaseGuard } from './guards/index';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	  MaterialModule,
	  HttpClientModule
  ],
  declarations: [
    LayoutComponent,
	  NotFoundComponent,
	 	FooterComponent,
		HeaderComponent,
		UsernamePipe,
    TitleCasePipeComponent
  ],
  providers: [
  	LoggedGuard,
  	LoggedOffGuard,
  	AuthFirebaseGuard,
  	AuthService,
  	PatientsService,
  	BilansService,
  	AlertService,
  	AuthFirebaseService,
  	UserFirebaseService
    ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	  NotFoundComponent,
	  UsernamePipe,
  	TitleCasePipeComponent,
	  FooterComponent,
	  HeaderComponent
  ],
  entryComponents: []
})
export class SharedModule {}
