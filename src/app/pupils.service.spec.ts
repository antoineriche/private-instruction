import { TestBed, inject } from '@angular/core/testing';

import { PupilsService } from './pupils.service';

describe('PupilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PupilsService]
    });
  });

  it('should be created', inject([PupilsService], (service: PupilsService) => {
    expect(service).toBeTruthy();
  }));
});
