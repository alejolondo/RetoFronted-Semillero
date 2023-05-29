import { TestBed } from '@angular/core/testing';

import { AffiliatesServiceService } from './affiliates-service.service';

describe('AffiliatesServiceService', () => {
  let service: AffiliatesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffiliatesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
