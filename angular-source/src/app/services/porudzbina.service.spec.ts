import { TestBed, inject } from '@angular/core/testing';

import { PorudzbinaService } from './porudzbina.service';

describe('PorudzbinaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PorudzbinaService]
    });
  });

  it('should be created', inject([PorudzbinaService], (service: PorudzbinaService) => {
    expect(service).toBeTruthy();
  }));
});
