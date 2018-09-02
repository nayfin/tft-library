import { DynamicFormModule } from './dynamic-form.module';

describe('FormGeneratorModule', () => {
  let dynamicFormModule: DynamicFormModule;

  beforeEach(() => {
    dynamicFormModule = new DynamicFormModule();
  });

  it('should create an instance', () => {
    expect(dynamicFormModule).toBeTruthy();
  });
});
