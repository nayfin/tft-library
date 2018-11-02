import { CallbackPipe } from './callback.pipe';

describe('CallbackPipe', () => {
  it('should create an instance', () => {
    const pipe = new CallbackPipe();
    expect(pipe).toBeTruthy();
  });

  it('should call callback function on value', () => {
    const pipe = new CallbackPipe();
    const times3 = (val) =>  val * 3;
    const transformedValue = pipe.transform( 4, times3 );
    expect(transformedValue).toEqual(12);
  });
});
