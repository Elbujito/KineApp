

import {AngularMaterialModule} from './../angular-material/angular-material.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreComponent} from './core.component';
import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from '.././app.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CoreComponent
  ],
  exports: [CoreComponent],
  entryComponents: [],
})
export class CoreModule {
}
