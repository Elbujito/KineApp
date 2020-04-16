import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MatCardModule } from '@angular/material';

describe('AboutComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent, NavbarComponent, FooterComponent],
      imports: [MatCardModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
  });
});
