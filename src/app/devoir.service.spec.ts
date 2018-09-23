import { TestBed, inject } from '@angular/core/testing';

import { DevoirService } from './devoir.service';

describe('DevoirService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevoirService]
    });
  });

  it('should be created', inject([DevoirService], (service: DevoirService) => {
    expect(service).toBeTruthy();
  }));
});
