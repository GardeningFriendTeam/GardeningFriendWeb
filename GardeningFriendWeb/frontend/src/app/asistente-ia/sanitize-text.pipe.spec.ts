import { SanitizeTextPipe } from './sanitize-text.pipe';

describe('SanitizeTextPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeTextPipe();
    expect(pipe).toBeTruthy();
  });
});
