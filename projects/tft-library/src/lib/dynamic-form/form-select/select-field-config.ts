import { DynamicFieldConfig } from '../dynamic-field-config';
import { Observable } from 'rxjs';

export interface SelectFieldConfig extends DynamicFieldConfig {
  options?: SelectOption [];
  optionsCallback?: () => Promise<SelectOption[]>;
  options$: Observable<any[]>;
}

export interface SelectOption {
  label: string;
  value: any;
}

