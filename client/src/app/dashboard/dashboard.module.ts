import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent, SearchBarComponent} from './index';
import { NoteDialogComponent, NoteConfirmDialogComponent } from './index';

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
	NoteDialogComponent,
	NoteConfirmDialogComponent
	],
  entryComponents: []
})
export class DashboardModule { }
