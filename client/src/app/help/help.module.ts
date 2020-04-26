import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HelpHomeComponent } from './index';

import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [HelpHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HelpRoutingModule,
	MaterialModule
  ]
})
export class HelpModule { }
