import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoirFormPage } from './devoir-form.page';

describe('DevoirFormPage', () => {
  let component: DevoirFormPage;
  let fixture: ComponentFixture<DevoirFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevoirFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevoirFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
