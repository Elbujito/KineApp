import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LayoutComponent, NotFoundComponent, ConfirmDialogComponent } from './index';
import { UsernamePipe } from './pipes/index';


@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	AngularMaterialModule
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
