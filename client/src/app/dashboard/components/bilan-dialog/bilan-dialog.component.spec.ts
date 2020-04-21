import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanDialogComponent } from './bilan-dialog.component';

describe('BilanDialogComponent', () => {
  let component: BilanDialogComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilanDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
