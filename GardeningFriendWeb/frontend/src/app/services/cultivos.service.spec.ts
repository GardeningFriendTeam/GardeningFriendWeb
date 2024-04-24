import { TestBed } from '@angular/core/testing';

import { CultivosService } from './cultivos.service';

describe('CultivosService', () => {
  let service: CultivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CultivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
