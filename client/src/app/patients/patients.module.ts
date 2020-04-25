import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientListComponent, PatientDialogComponent } from './index';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule,
	AngularMaterialModule
  ],
  declarations: [
    PatientListComponent,
	PatientDialogComponent
  ],
  entryComponents: [PatientDialogComponent
  ]
})
export class PatientsModule { }
