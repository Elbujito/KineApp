import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent, NotFoundComponent, HeaderComponent, HeaderMainComponent, FooterComponent} from './index';
import { UsernamePipe, TitleCasePipeComponent } from './pipes/index';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	  MaterialModule
  ],
  declarations: [
    LayoutComponent,
	  NotFoundComponent,
	  UsernamePipe,
	  TitleCasePipeComponent,
	  	FooterComponent,
		HeaderComponent,
		HeaderMainComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	NotFoundComponent,
	UsernamePipe,
  	TitleCasePipeComponent,
	FooterComponent,
	HeaderComponent,
	HeaderMainComponent
  ],
  entryComponents: []
})
export class SharedModule { }
