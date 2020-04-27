import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material.module';

import { HomeComponent, ContactComponent, HeaderMainComponent} from './index';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
	  AuthModule,
    SharedModule,
	  MaterialModule
  ],
  declarations: [HomeComponent, ContactComponent, HeaderMainComponent],
  entryComponents: []
})
export class HomeModule { }
