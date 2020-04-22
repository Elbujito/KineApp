import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LoginComponent,
    LogoutComponent,
    PasswordComponent
} from './components/index';
import { LoggedGuard, LoggedOffGuard } from './guards/index';

const routes: Routes = [
    {
        path: 'loginIn',
        component: LoginComponent,
        canActivate: [LoggedOffGuard]
    },
    {
        path: 'password',
        component: PasswordComponent,
        canActivate: [LoggedOffGuard]
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [LoggedGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        LoggedGuard,
        LoggedOffGuard
    ]
})
export class AuthRoutingModule {}
