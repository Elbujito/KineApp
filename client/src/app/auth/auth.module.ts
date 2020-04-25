import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { AuthService } from '../core/services/index';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, LogoutComponent, PasswordComponent,SwitchComponent } from './index';

@NgModule({
    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        AuthRoutingModule
		],
    exports: [SwitchComponent, LoginComponent, PasswordComponent],
    declarations: [
        LoginComponent,
        PasswordComponent,
        LogoutComponent,
        SwitchComponent
    ],
    providers: []
})
export class AuthModule {}
