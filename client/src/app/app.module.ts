import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthServiceConfiguration } from './shared/models/index';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AboutModule } from './about/about.module';
import { HelpModule } from './help/help.module';
import { PatientsModule } from './patients/patients.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../environments/environment';

export function getToken(): string {
    return localStorage.getItem('token');
}

export function authServiceConfiguration(): AuthServiceConfiguration {
    return {
        baseUrl: `${environment.apiUrl}/auth`,
        productInformations: {
            name: '',
            version: ''
        }
    };
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
		SharedModule,
        CoreModule,
		AppRoutingModule,
		HomeModule,
		AboutModule,
		HelpModule,
		AuthModule,
		PatientsModule,
		ProfileModule,
		DashboardModule,
		JwtModule.forRoot({
            config: {
                tokenGetter: getToken
            }
        })
    ],
    providers: [
        { provide: AuthServiceConfiguration, useFactory: authServiceConfiguration }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
