import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { MaterialModule } from '../../material.module';

import { TemplateListComponent,
		 TemplateDialogComponent,
		 TemplateConfirmDialogComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
	MaterialModule
  ],
    declarations: [
		 TemplateListComponent,
		 TemplateDialogComponent,
		 TemplateConfirmDialogComponent
  ],
    exports: [
  		 TemplateListComponent,
  		 TemplateDialogComponent,
  		 TemplateConfirmDialogComponent
    ],
  entryComponents: [
		 TemplateDialogComponent,
		 TemplateConfirmDialogComponent
  ]
})
export class ConfigurationAdminModule { }
