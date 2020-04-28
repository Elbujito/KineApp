import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent, SearchBarComponent} from './index';
import { BilanDialogComponent, BilanConfirmDialogComponent } from './index';

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
	BilanDialogComponent,
	BilanConfirmDialogComponent
	],
  entryComponents: []
})
export class DashboardModule { }
