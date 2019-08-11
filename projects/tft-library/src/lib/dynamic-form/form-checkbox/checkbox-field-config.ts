import { DynamicFieldConfig } from '../dynamic-field-config';

export interface CheckboxFieldConfig extends DynamicFieldConfig {
  labelPosition: 'before' | 'after';
  inline: boolean;
}
