import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LocalisationListComponent,
		 LocalisationDialogComponent,
		 LocalisationConfirmDialogComponent,
		 PathologyTypeListComponent,
		 PathologyTypeDialogComponent,
		 PathologyTypeConfirmDialogComponent} from './index';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
	MaterialModule
  ],
  declarations: [
		 LocalisationListComponent,
		 LocalisationDialogComponent,
		 LocalisationConfirmDialogComponent,
		 PathologyTypeListComponent,
		 PathologyTypeDialogComponent,
		 PathologyTypeConfirmDialogComponent
  ],
    exports: [
  		 LocalisationListComponent,
  		 LocalisationDialogComponent,
  		 LocalisationConfirmDialogComponent,
  		 PathologyTypeListComponent,
  		 PathologyTypeDialogComponent,
  		 PathologyTypeConfirmDialogComponent
    ],
  entryComponents: [
		 LocalisationDialogComponent,
		 LocalisationConfirmDialogComponent,
		 PathologyTypeDialogComponent,
		 PathologyTypeConfirmDialogComponent
  ]
})
export class ConfigurationCommonModule { }
