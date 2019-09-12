import { DynamicFieldConfig } from '../models';

export interface CheckboxFieldConfig extends DynamicFieldConfig {
  labelPosition: 'before' | 'after';
  inline: boolean;
  text: string;
}
