import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../shared/services/index';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, LogoutComponent, AuthFirebaseComponent, PasswordComponent,SwitchComponent } from './index';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
    exports: [SwitchComponent, LoginComponent, PasswordComponent, AuthFirebaseComponent],
    declarations: [
        LoginComponent,
        PasswordComponent,
        LogoutComponent,
        SwitchComponent,
		    AuthFirebaseComponent
    ],
    providers: []
})
export class AuthModule {}
