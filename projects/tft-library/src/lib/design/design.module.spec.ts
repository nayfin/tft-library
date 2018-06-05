import { DesignModule } from './design.module';

describe('DesignModule', () => {
  let designModule: DesignModule;

  beforeEach(() => {
    designModule = new DesignModule();
  });

  it('should create an instance', () => {
    expect(designModule).toBeTruthy();
  });
});
