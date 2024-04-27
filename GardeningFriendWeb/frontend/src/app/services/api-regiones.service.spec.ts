import { TestBed } from '@angular/core/testing';

import { ApiRegionesService } from './api-regiones.service';

describe('ApiRegionesService', () => {
  let service: ApiRegionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRegionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
