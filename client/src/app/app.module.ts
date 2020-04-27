import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule } from '@angular/fire/firestore';

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
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

const config = {
  apiKey: 'AIzaSyAeTlvXxWg5-TGzFt4zL6P_plUWGR6gs14',
  authDomain: 'medinotes-eac0b.firebaseapp.com',
  databaseURL: 'https://medinotes-eac0b.firebaseio.com',
  projectId: 'medinotes-eac0b',
  storageBucket: 'medinotes-eac0b.appspot.com',
  messagingSenderId: '721705916115',
  appId: '1:721705916115:web:9199fe2ab4340f0cc62626'
}

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
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
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
        }),
		NgxAuthFirebaseUIModule.forRoot(config)
    ],
    providers: [
        { provide: AuthServiceConfiguration, useFactory: authServiceConfiguration }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
