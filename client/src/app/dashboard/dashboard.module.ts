import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ConsultationComponent,
		 DashboardComponent,
		 SearchBarComponent,
		 PathologyDialogComponent,
		 PathologyConfirmDialogComponent,
		 ConsultationConfirmDialogComponent,
		 BilanArticulaireTableComponent,
		 BilanMusculaireTableComponent,
		 BilanAlgiqueComponent,
		 BilanHeaderComponent
} from './index';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
	  MaterialModule
  ],
  declarations: [
	DashboardComponent,
	SearchBarComponent,
	ConsultationComponent,
	PathologyDialogComponent,
	PathologyConfirmDialogComponent,
	ConsultationConfirmDialogComponent,
	BilanArticulaireTableComponent,
	BilanMusculaireTableComponent,
	BilanAlgiqueComponent,
	BilanHeaderComponent
	],
  entryComponents: [PathologyDialogComponent, PathologyConfirmDialogComponent, ConsultationConfirmDialogComponent]
})
export class DashboardModule { }
