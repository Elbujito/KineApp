import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../core/services/index';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, PhoneSigninComponent, LogoutComponent, AuthFirebaseComponent, PasswordComponent,SwitchComponent } from './index';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import {AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
    imports: [
        CommonModule,
        AngularFireAuthModule,
        FormsModule,
        AuthRoutingModule,
        SharedModule,
		    MaterialModule,
			 NgxAuthFirebaseUIModule
		],
    exports: [SwitchComponent, LoginComponent, PasswordComponent, AuthFirebaseComponent, PhoneSigninComponent],
    declarations: [
        LoginComponent,
        PasswordComponent,
        LogoutComponent,
        SwitchComponent,
		AuthFirebaseComponent,
		PhoneSigninComponent
    ],
    providers: []
})
export class AuthModule {}
