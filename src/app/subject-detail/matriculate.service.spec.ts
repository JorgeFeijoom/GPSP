import { TestBed, inject } from '@angular/core/testing';

import { MatriculateService } from './matriculate.service';

describe('MatriculateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatriculateService]
    });
  });

  it('should be created', inject([MatriculateService], (service: MatriculateService) => {
    expect(service).toBeTruthy();
  }));
});
