import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { SubscriptionModule } from './subscription/subscription.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthServiceConfiguration } from './shared/models/index';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AboutModule } from './about/about.module';
import { HelpModule } from './help/help.module';
import { PatientModule } from './patient/patient.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

const firebaseConfig = {
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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
		SharedModule,
		AppRoutingModule,
		HomeModule,
		AboutModule,
		ContactModule,
		HelpModule,
		AuthModule,
		PatientModule,
		ProfileModule,
		DashboardModule,
		SubscriptionModule,
		ConfigurationModule,
		JwtModule.forRoot({
            config: {
                tokenGetter: getToken
            }
        }),
		NgxAuthFirebaseUIModule.forRoot(firebaseConfig)
    ],
    providers: [
        { provide: AuthServiceConfiguration, useFactory: authServiceConfiguration }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
