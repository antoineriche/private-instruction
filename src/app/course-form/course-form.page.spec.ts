import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormPage } from './course-form.page';

describe('CourseFormPage', () => {
  let component: CourseFormPage;
  let fixture: ComponentFixture<CourseFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
