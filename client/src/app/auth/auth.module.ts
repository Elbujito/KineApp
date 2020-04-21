import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './services/index';
import { AuthRoutingModule } from './auth-routing.module';
import {
    LoginComponent,
    LogoutComponent,
    PasswordComponent,
    SwitchComponent
} from './components/index';
import { UsernamePipe } from './pipes/index';

export function getToken(): string {
    return localStorage.getItem('token');
}

@NgModule({
    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        AuthRoutingModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: getToken
            }
        })
    ],
    exports: [UsernamePipe, SwitchComponent],
    declarations: [
        LoginComponent,
        PasswordComponent,
        LogoutComponent,
        UsernamePipe,
        SwitchComponent
    ],
    providers: [
        AuthService,
        JwtHelperService
    ]
})
export class AuthModule {}
