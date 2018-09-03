import { Validator } from '@angular/forms';

export interface DynamicFieldConfig {
  controlType: ControlType;
  controlName: string;
  label?: string;
  displayConfig?: DisplayConfig;
  validators?: Validator[];
  placeholder?: string;
  value?: string | number;
}


export interface DisplayConfig {
  controlName: string;
  values: string[];
}

export enum ControlType {
  INPUT = 'input',
  SELECT = 'select',
  BUTTON = 'button'
}
