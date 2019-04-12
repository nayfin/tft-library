import { InjectionToken } from '@angular/core';


export const defaultErrors = {
  default: 'A default error occurred',
  required: () => `This field is required`,
  // TODO: the below error won't called unless using a custom validator
  // We are hoping that the @angular/forms team will accept our proposal to rename key in error object
  requiredTrue: () => `The conditions must be accepted`,
  email: () => `Please enter a valid email address`,
  minlength: ({ requiredLength, actualLength }) => `Expected ${requiredLength} characters but got ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }) => `Expected ${requiredLength} but got ${actualLength}`,
  min: ({min, actual}) => `Minimum allowed value is ${min}, actual value is ${actual}`,
  max: ({max, actual}) => `Maximum allowed value is ${max}, actual value is ${actual}`,
  pattern: ({requiredPattern, actualValue}) => `${actualValue} fails to match pattern ${requiredPattern}`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});


