import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoirListPage } from './devoir-list.page';

describe('DevoirListPage', () => {
  let component: DevoirListPage;
  let fixture: ComponentFixture<DevoirListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevoirListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevoirListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
