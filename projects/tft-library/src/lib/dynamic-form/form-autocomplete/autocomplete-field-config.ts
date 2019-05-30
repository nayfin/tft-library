import { DynamicFieldConfig } from '../dynamic-field-config';
import { OptionsType } from '../form-select/select-field-config';

export interface AutocompleteFieldConfig extends DynamicFieldConfig {
  emptyOptionsMessage?: string;
  options: OptionsType;
}

export const DEFAULT_EMPTY_OPTIONS_MESSAGE = 'No Items';
