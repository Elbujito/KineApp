import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent, NotFoundComponent, ConfirmDialogComponent} from './index';
import { UsernamePipe } from './pipes/index';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	  MaterialModule
  ],
  declarations: [
    ConfirmDialogComponent,
    LayoutComponent,
	  NotFoundComponent,
	  UsernamePipe
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ConfirmDialogComponent,
	NotFoundComponent,
	UsernamePipe
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
