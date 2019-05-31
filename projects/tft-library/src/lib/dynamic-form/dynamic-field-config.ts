import { FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { AutocompleteFieldConfig } from './form-autocomplete/autocomplete-field-config';

import { SelectFieldConfig } from './form-select/select-field-config';
import { WatchControlConfig } from './conditional-fields.service';
import { InputFieldConfig } from './form-input/input-field-config';
import { FormGroupListConfig } from './form-group-list/form-group-list.config';
import { ErrorDictionary } from '../validation-handling/public_api';

interface DynamicFieldConfig {
  controlName: string;
  controlType: ControlType;
  label?: string;
  placeholder?: string;
  classes?: string[];
  attrs?: Attr[];
  flexLayoutConfig?: any;
  computeField?: (form: FormGroup, config?: any ) => Observable<any>;
  computeFieldConfig?: {};
  // function that returns an observable that resolves to a boolean
  showField?: (form: FormGroup, config?: any ) => Observable<boolean>;
  showFieldConfig?: WatchControlConfig | any; // any is required for user defined configs, TODO: maybe offer way to add type to config
  validators?: ValidatorFn[];
  value?: string | number;
}

interface FormConfig {
  controlType?: ControlType;
  controlName: string;
  label?: string;
  errorDictionary?: ErrorDictionary;
  fields: AnyFieldConfig[];
}

type AnyFieldConfig = DynamicFieldConfig | SelectFieldConfig | InputFieldConfig | FormGroupListConfig| FormConfig | AutocompleteFieldConfig;

interface Attr {
  name: string;
  value: string;
}

enum ControlType {
  AUTOCOMPLETE = 'autocomplete',
  INPUT = 'input',
  SELECT = 'select',
  BUTTON = 'button',
  GROUP = 'group',
  GROUP_LIST = 'groupList'
}

export {ControlType, AnyFieldConfig, DynamicFieldConfig, FormGroupListConfig, FormConfig};
