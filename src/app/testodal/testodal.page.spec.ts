import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestodalPage } from './testodal.page';

describe('TestodalPage', () => {
  let component: TestodalPage;
  let fixture: ComponentFixture<TestodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
