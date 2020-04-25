import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../core/services/index';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, LogoutComponent, PasswordComponent,SwitchComponent } from './index';

import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
		MaterialModule
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
