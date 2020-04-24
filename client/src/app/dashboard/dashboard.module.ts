import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {AuthModule} from '../auth/auth.module';
import {PatientsService} from './services/patients.service';
import {BilansService} from "./services/bilans.service";

import {LayoutComponent} from './components/layout/layout.component';
import {PatientListComponent} from './components/patient-list/patient-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileDetailsComponent} from './components/profile-details/profile-details.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AboutComponent} from './components/about/about.component';
import {FooterComponent} from './components/footer/footer.component'
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BilanDialogComponent} from './components/bilan-dialog/bilan-dialog.component';
import {ResultCardsComponent} from './components/result-cards/result-cards.component';
import {HomeComponent} from './components/home/home.component';
import { SearchBarComponent } from './components/searchbar/searchbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpModule,
	  AuthModule,
	  DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PatientsService,
    BilansService
  ],
  declarations: [
    NotFoundComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    ResultCardsComponent,
    BilanDialogComponent,
    DashboardComponent,
	  HomeComponent,
	  SearchBarComponent,
	  ProfileComponent,
	  ProfileDetailsComponent,
	  PatientListComponent,
	  LayoutComponent
  ],
  exports: [
      NotFoundComponent,
      AboutComponent,
      NavbarComponent,
      FooterComponent,
      ResultCardsComponent,
      BilanDialogComponent,
      DashboardComponent
    ],
  entryComponents: []
})

export class DashboardModule {
}
