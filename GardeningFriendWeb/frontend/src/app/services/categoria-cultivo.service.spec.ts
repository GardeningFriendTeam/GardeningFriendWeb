import { TestBed } from '@angular/core/testing';

import { CategoriaCultivoService } from './categoria-cultivo.service';

describe('CategoriaCultivoService', () => {
  let service: CategoriaCultivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaCultivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
