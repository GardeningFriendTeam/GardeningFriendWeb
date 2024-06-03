import { TestBed } from '@angular/core/testing';

import { StripeapiService } from './stripeapi.service';

describe('StripeapiService', () => {
  let service: StripeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripeapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
