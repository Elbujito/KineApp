import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { BilanDialogComponent, DashboardComponent, SearchBarComponent} from './index';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
	AngularMaterialModule
  ],
  declarations: [
    DashboardComponent,
	SearchBarComponent,
	BilanDialogComponent
  ],
  entryComponents: [BilanDialogComponent
  ]
})
export class DashboardModule { }
