import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilFormPage } from './pupil-form.page';

describe('PupilFormPage', () => {
  let component: PupilFormPage;
  let fixture: ComponentFixture<PupilFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
