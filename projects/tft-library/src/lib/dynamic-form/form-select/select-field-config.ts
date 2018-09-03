import { DynamicFieldConfig } from '../dynamic-field-config';

export interface SelectFieldConfig extends DynamicFieldConfig {
  options: SelectOption [];
}

export interface SelectOption {
  value: number | string;
}

