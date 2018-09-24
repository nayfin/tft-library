import { IsFormGroupConfigPipe } from './is-form-group-config.pipe';

fdescribe('IsFormGroupConfigPipe', () => {

  beforeEach( () => {
    const pipe = new IsFormGroupConfigPipe();

    it('should create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    it('should return false when passed an array', () => {
      expect(pipe.transform([])).toBeFalsy();
    });

    it('should return true when passed a valid config', () => {
      const validConfig = {
        'controlType': 'input',
        'label': 'First name',
        'inputType': 'text',
        'controlName': 'firstName',
        'placeholder': 'Enter your first name',
        'classes': [],
        'flexLayoutConfig': {
          'fxFlex': 40
        },
        'validators': [
          null
        ]
      };
      expect(pipe.transform( validConfig )).toBeTruthy();
    });
  });
});
