import { DynamicFieldConfig, FormConfig } from '../models';

export interface FormGroupListConfig extends DynamicFieldConfig {
  itemConfig: FormConfig;
  addItemLabel?: string;
  itemLabelBuilder?: (index: number) => string;
  minListLength?: number;
}
