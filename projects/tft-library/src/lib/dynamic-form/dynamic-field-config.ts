import { FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { AutocompleteFieldConfig } from './form-autocomplete/autocomplete-field-config';

import { SelectFieldConfig } from './form-select/select-field-config';
import { InputFieldConfig } from './form-input/input-field-config';
import { FormGroupListConfig } from './form-group-list/form-group-list.config';
import { ErrorDictionary } from '../validation-handling/public_api';

interface ComputeFieldConfig {
  controlNameToSet?: string;
  controlNamesToWatch: string[];
  computeCallback: (
    values: (string | number)[]
  ) => string | number;
}

interface WatchControlConfig {
  controlName: string;
  values: string[];
  evaluate: (any) => boolean;
}

interface DisplayFieldConfig {
  controlName: string;
  watchConfigs: WatchControlConfig[];
  evaluate: (
    bools: boolean[]
  ) => boolean;
}
interface DynamicFieldConfig {
  controlName: string;
  controlType: ControlType;
  label?: string;
  placeholder?: string;
  classes?: string[];
  flexLayoutConfig?: any;
  computeField?: ( group: FormGroup, config: ComputeFieldConfig) => Observable<any>;
  computeFieldConfig?: ComputeFieldConfig;
  // function that returns an observable that resolves to a boolean
  showField?: (group: FormGroup, config?: any ) => Observable<boolean>;
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

export {ControlType, AnyFieldConfig, DynamicFieldConfig, FormGroupListConfig, FormConfig, WatchControlConfig, DisplayFieldConfig, ComputeFieldConfig};
