import { TestBed } from '@angular/core/testing';

import { GeminiTextService } from './gemini-text.service';

describe('GeminiTextService', () => {
  let service: GeminiTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeminiTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
