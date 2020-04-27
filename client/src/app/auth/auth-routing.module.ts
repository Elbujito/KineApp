import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, LogoutComponent, PasswordComponent, AuthFirebaseComponent} from './index';
import { LoggedGuard, LoggedOffGuard } from '../shared/guards/index';

const routes: Routes = [
    {
        path: 'login',
        component: AuthFirebaseComponent,
    },
    {
        path: 'loginServer',
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
