import { TestBed } from '@angular/core/testing';

import { GeminiImgService } from './gemini-img.service';

describe('GeminiImgService', () => {
  let service: GeminiImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeminiImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
