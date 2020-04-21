import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule, AuthServiceConfiguration } from './auth/index';
import { DashboardModule } from './dashboard/index';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';


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
        HttpClientModule,
        AuthModule,
		DashboardModule,
        AppRoutingModule
    ],
    providers: [
        { provide: AuthServiceConfiguration, useFactory: authServiceConfiguration }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
