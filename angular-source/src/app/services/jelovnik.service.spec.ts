import { TestBed, inject } from '@angular/core/testing';

import { JelovnikService } from './jelovnik.service';

describe('JelovnikService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JelovnikService]
    });
  });

  it('should be created', inject([JelovnikService], (service: JelovnikService) => {
    expect(service).toBeTruthy();
  }));
});
