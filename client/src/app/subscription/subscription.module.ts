import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SubscriptionHomeComponent } from './index';

import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [SubscriptionHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    SubscriptionRoutingModule,
	MaterialModule
  ]
})
export class SubscriptionModule { }
