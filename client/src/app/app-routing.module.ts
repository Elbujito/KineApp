import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard, LoggedOffGuard, AuthFirebaseGuard} from './shared/guards/index';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthFirebaseGuard]
    },
    {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule',
        canActivate: [AuthFirebaseGuard]
    },
	{
        path: 'patients',
        loadChildren: './patients/patients.module#PatientsModule',
        canActivate: [AuthFirebaseGuard]
    },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
        canActivate: [AuthFirebaseGuard]
    },
    {
        path: 'about',
        loadChildren: './about/about.module#AboutModule',
        canActivate: [LoggedOffGuard]
    },
    {
         path: 'subscription',
         loadChildren: './subscription/subscription.module#SubscriptionModule',
    },
	  {
        path: 'help',
        loadChildren: './help/help.module#HelpModule',
        canActivate: [AuthFirebaseGuard]
    },
	{
        path: '',
        loadChildren: './home/home.module#HomeModule',
        canActivate: [LoggedOffGuard]
    },
	{
        path: 'login',
        loadChildren: './auth/auth.module#AuthModule',
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
