import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, LogoutComponent, PasswordComponent} from './index';
import { LoggedGuard, LoggedOffGuard } from '../core/guards/index';

const routes: Routes = [
    {
        path: 'loginIn',
        component: LoginComponent,
        canActivate: [LoggedOffGuard]
    },
    {
        path: 'password',
        component: PasswordComponent,
        canActivate: [LoggedGuard]
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
