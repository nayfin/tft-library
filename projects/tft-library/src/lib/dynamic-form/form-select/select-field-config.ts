import { DynamicFieldConfig } from '../dynamic-field-config';
import { Observable } from 'rxjs';

export interface SelectFieldConfig extends DynamicFieldConfig {
  emptyOptionsMessage?: string;
  multiple?: boolean;
  options?: SelectOption [];
  optionsCallback?: () => Promise<SelectOption[]>;
  options$?: Observable<any[]>;
}

export interface SelectOption {
  label: string;
  value: any;
}

export const DEFAULT_EMPTY_OPTIONS_MESSAGE = 'No Items';
