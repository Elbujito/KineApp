import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard, LoggedOffGuard } from './core/guards/index';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [LoggedGuard]
    },
    {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule',
        canActivate: [LoggedGuard]
    },
	{
        path: 'patients',
        loadChildren: './patients/patients.module#PatientsModule',
        canActivate: [LoggedGuard]
    },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
        canActivate: [LoggedGuard]
    },
    {
        path: 'about',
        loadChildren: './about/about.module#AboutModule',
        canActivate: [LoggedGuard]
    },
	{
        path: '',
        loadChildren: './home/home.module#HomeModule',
        canActivate: [LoggedOffGuard]
    },
	{
        path: 'login',
        loadChildren: './home/home.module#HomeModule',
        canActivate: [LoggedOffGuard]
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
