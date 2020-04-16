import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreComponent } from './core.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { FooterComponent } from './../components/footer/footer.component';
import { AboutComponent } from './../components/about/about.component';
import { SupportComponent } from './../components/support/support.component';

import { PatientsService } from '../services/cities.service';
import {of} from "rxjs/observable/of";

describe('CoreComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoreComponent,
        NavbarComponent,
        FooterComponent,
        AboutComponent,
        SupportComponent,

      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
      ],
      providers: [
        PatientsService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
