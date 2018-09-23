import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilDetailPage } from './pupil-detail.page';

describe('PupilDetailPage', () => {
  let component: PupilDetailPage;
  let fixture: ComponentFixture<PupilDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
