import { CallbackPipe } from './callback.pipe';

describe('CallbackPipe', () => {
  it('create an instance', () => {
    const pipe = new CallbackPipe();
    expect(pipe).toBeTruthy();
  });
});
