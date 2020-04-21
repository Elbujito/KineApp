import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {AngularMaterialModule} from '../angular-material/angular-material.module';

import {PatientsService} from './services/patients.service';
import {BilansService} from "./services/bilans.service";

import {NotFoundComponent} from './components/not-found/not-found.component';
import {AboutComponent} from './components/about/about.component';
import {FooterComponent} from './components/footer/footer.component'
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BilanDialogComponent} from './components/bilan-dialog/bilan-dialog.component';
import {ResultCardsComponent} from './components/result-cards/result-cards.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
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
    DashboardComponent
  ],
  exports: [DashboardComponent],
  entryComponents: [BilanDialogComponent]
})

export class DashboardModule {
}
