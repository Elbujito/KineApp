import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PrescripteurListComponent,
		 PrescripteurDialogComponent,
		 PrescripteurConfirmDialogComponent,
		 MouvementListComponent,
		 MouvementDialogComponent,
		 MouvementConfirmDialogComponent,
		 MuscleListComponent,
		 MuscleDialogComponent,
		 MuscleConfirmDialogComponent } from './index';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
	MaterialModule
  ],
  declarations: [
         PrescripteurListComponent,
		 PrescripteurDialogComponent,
		 PrescripteurConfirmDialogComponent,
		 MouvementListComponent,
		 MouvementDialogComponent,
		 MouvementConfirmDialogComponent,
		 MuscleListComponent,
		 MuscleDialogComponent,
		 MuscleConfirmDialogComponent
  ],
    exports: [
           PrescripteurListComponent,
  		 PrescripteurDialogComponent,
  		 PrescripteurConfirmDialogComponent,
  		 MouvementListComponent,
  		 MouvementDialogComponent,
  		 MouvementConfirmDialogComponent,
  		 MuscleListComponent,
  		 MuscleDialogComponent,
  		 MuscleConfirmDialogComponent
    ],
  entryComponents: [
		 PrescripteurDialogComponent,
		 PrescripteurConfirmDialogComponent,
		 MouvementDialogComponent,
		 MouvementConfirmDialogComponent,
		 MuscleDialogComponent,
		 MuscleConfirmDialogComponent
  ]
})
export class ConfigurationKinesitherapieModule { }
