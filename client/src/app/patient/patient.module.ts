import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientListComponent, PatientDialogComponent, PatientConfirmDialogComponent } from './index';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
	  MaterialModule
  ],
  declarations: [
    PatientListComponent,
	  PatientDialogComponent,
	  PatientConfirmDialogComponent
  ],
  entryComponents: [PatientDialogComponent, PatientConfirmDialogComponent]
})
export class PatientModule { }
