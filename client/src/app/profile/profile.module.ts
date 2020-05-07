import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { MaterialModule } from '../material.module';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { ProfileComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
	  AuthModule,
	  MaterialModule,
	  NgxAuthFirebaseUIModule
  ],
  declarations: [ProfileComponent],
  entryComponents: []
})
export class ProfileModule { }
