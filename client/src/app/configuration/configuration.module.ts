import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ConfigurationComponent} from './index';

import { ConfigurationCommonModule } from './configuration-common/configuration-common.module';
import { ConfigurationKinesitherapieModule } from './configuration-kinesitherapie/configuration-kinesitherapie.module';
import { ConfigurationOsteopathieModule } from './configuration-osteopathie/configuration-osteopathie.module';
import { ConfigurationMedecinModule } from './configuration-medecin/configuration-medecin.module';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
	SharedModule,
	MaterialModule,
    ConfigurationRoutingModule,
	ConfigurationCommonModule,
	ConfigurationKinesitherapieModule,
	ConfigurationOsteopathieModule,
	ConfigurationMedecinModule
  ],
  declarations: [ ConfigurationComponent ],
  entryComponents: []
})
export class ConfigurationModule { }
