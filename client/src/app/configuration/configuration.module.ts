import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrescripteurListComponent, 
		 PrescripteurDialogComponent, 
		 PrescripteurConfirmDialogComponent,
		 MouvementListComponent, 
		 MouvementDialogComponent, 
		 MouvementConfirmDialogComponent, 
		 MuscleListComponent, 
		 MuscleDialogComponent, 
		 MuscleConfirmDialogComponent, 
		 LocalisationListComponent, 
		 LocalisationDialogComponent, 
		 LocalisationConfirmDialogComponent, 
		 PathologyTypeListComponent, 
		 PathologyTypeDialogComponent, 
		 PathologyTypeConfirmDialogComponent, 
		 ConfigurationComponent} from './index';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
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
		 MuscleConfirmDialogComponent, 
		 LocalisationListComponent, 
		 LocalisationDialogComponent, 
		 LocalisationConfirmDialogComponent, 
		 PathologyTypeListComponent, 
		 PathologyTypeDialogComponent, 
		 PathologyTypeConfirmDialogComponent, 
		 ConfigurationComponent
  ],
  entryComponents: [
		 PrescripteurDialogComponent, 
		 PrescripteurConfirmDialogComponent,
		 MouvementDialogComponent, 
		 MouvementConfirmDialogComponent, 
		 MuscleDialogComponent, 
		 MuscleConfirmDialogComponent, 
		 LocalisationDialogComponent, 
		 LocalisationConfirmDialogComponent, 
		 PathologyTypeDialogComponent, 
		 PathologyTypeConfirmDialogComponent
  ]
})
export class ConfigurationModule { }
