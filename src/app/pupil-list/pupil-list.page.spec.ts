import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilListPage } from './pupil-list.page';

describe('PupilListPage', () => {
  let component: PupilListPage;
  let fixture: ComponentFixture<PupilListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
