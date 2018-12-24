import { DynamicFieldConfig, AnyFieldConfig } from '../dynamic-field-config';
import { ControlType } from '../dynamic-field-config';

export interface FormArrayConfig extends DynamicFieldConfig {
  // inputType?: string;
  // controlType: ControlType;
  itemConfig: AnyFieldConfig;
  values?: any[];
}
