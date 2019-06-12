import { DynamicFieldConfig } from '../dynamic-field-config';
import { OptionsType, SelectOption } from '../form-select/select-field-config';

export interface AutocompleteFieldConfig extends DynamicFieldConfig {
  emptyOptionsMessage?: string;
  options: OptionsType;
  filterFunction?: (options: SelectOption[], searchString: string) => SelectOption[];
}

export const DEFAULT_EMPTY_OPTIONS_MESSAGE = 'No Items';
