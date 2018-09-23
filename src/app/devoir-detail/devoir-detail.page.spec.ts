import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoirDetailPage } from './devoir-detail.page';

describe('DevoirDetailPage', () => {
  let component: DevoirDetailPage;
  let fixture: ComponentFixture<DevoirDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevoirDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevoirDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
