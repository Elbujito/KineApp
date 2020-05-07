import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
	MaterialModule
  ],
  declarations: [],
  entryComponents: []
})
export class ConfigurationMedecinModule { }
