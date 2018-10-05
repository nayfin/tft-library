import { Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { SelectFieldConfig } from './form-select/select-field-config';
import { WatchControlConfig } from './conditional-fields.service';
import { InputFieldConfig } from './form-input/input-field-config';

interface DynamicFieldConfig {
  controlType: string;
  controlName: string;
  label?: string;
  placeholder?: string;
  classes?: string[];
  attrs?: Attr[];
  flexLayoutConfig?: any;
  // function that returns an observable that resolves to a boolean
  showField?: (form: FormGroup, config?: any ) => Observable<boolean>;
  displayConfig?: WatchControlConfig | any; // any is required for user defined configes, TODO: maybe offer way to add type to config
  validators?: Validators[];
  value?: string | number;
}

type AnyFieldConfig = DynamicFieldConfig | SelectFieldConfig | InputFieldConfig;

type FormConfig = AnyFieldConfig[] | AnyFieldConfig[][];

interface Attr {
  name: string;
  value: string;
}

enum ControlType {
  INPUT = 'input',
  SELECT = 'select',
  BUTTON = 'button'
}

export {ControlType, AnyFieldConfig, DynamicFieldConfig, FormConfig, Attr};
