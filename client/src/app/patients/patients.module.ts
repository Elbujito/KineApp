import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientListComponent, PatientDialogComponent, ConfirmDialogComponent } from './index';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule,
	MaterialModule
  ],
  declarations: [
    PatientListComponent,
	PatientDialogComponent,
	ConfirmDialogComponent
  ],
  entryComponents: [PatientDialogComponent, ConfirmDialogComponent]
})
export class PatientsModule { }
