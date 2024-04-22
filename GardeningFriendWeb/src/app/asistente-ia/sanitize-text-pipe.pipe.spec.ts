import { SanitizeTextPipePipe } from './sanitize-text-pipe.pipe';

describe('SanitizeTextPipePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeTextPipePipe();
    expect(pipe).toBeTruthy();
  });
});
