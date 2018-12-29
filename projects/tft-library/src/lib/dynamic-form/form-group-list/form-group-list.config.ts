import { DynamicFieldConfig, AnyFieldConfig, FormConfig } from '../dynamic-field-config';
import { ControlType } from '../dynamic-field-config';

export interface FormGroupListConfig extends DynamicFieldConfig {
  itemConfig: FormConfig;
  addItemLabel?: string;
  itemLabelBuilder?: (index: number) => string;
  values?: any[];
}
