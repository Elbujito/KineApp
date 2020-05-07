import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { LayoutComponent, NotFoundComponent, HeaderComponent, FooterComponent} from './components/index';
import { TitleCasePipeComponent } from './pipes/index';

import { PathologyTypesService,
		 AuthFirebaseService,
		 PatientsService ,
		 NotesService,
		 AlertService,
		 UserFirebaseService,
		 LocalisationsService,
		 MouvementsService,
		 MusclesService,
		 PrescripteursService,
		 PathologiesService,
		 NoteTemplatesService,
		 BilanArticulairesService,
		 BilanMusculairesService,
		 BilanAlgiquesService
} from './services/index';

import { AuthFirebaseGuard } from './guards/index';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	  MaterialModule,
	  HttpClientModule,
	  NgxAuthFirebaseUIModule
  ],
  declarations: [
    LayoutComponent,
	  NotFoundComponent,
	 	FooterComponent,
		HeaderComponent,
    TitleCasePipeComponent
  ],
  providers: [
  	AuthFirebaseGuard,
  	PatientsService,
  	NotesService,
  	AlertService,
  	AuthFirebaseService,
  	UserFirebaseService,
  	PathologyTypesService,
	LocalisationsService,
	MouvementsService,
	MusclesService,
	PrescripteursService,
	PathologiesService,
	NoteTemplatesService,
	BilanArticulairesService,
	BilanMusculairesService,
	BilanAlgiquesService
    ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	  NotFoundComponent,
  	TitleCasePipeComponent,
	  FooterComponent,
	  HeaderComponent
  ],
  entryComponents: []
})
export class SharedModule {}
