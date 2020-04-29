import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { ContactRoutingModule } from './contact-routing.module';
import { MaterialModule } from '../material.module';

import { ContactComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
	AuthModule,
    SharedModule,
	MaterialModule
  ],
  declarations: [ContactComponent],
  entryComponents: []
})
export class ContactModule { }
