import { OptionsType, SelectOption, ReactiveOptionsConfig, DynamicFieldConfig } from '../models';

export interface AutocompleteFieldConfig extends DynamicFieldConfig {
  emptyOptionsMessage?: string;
  options: OptionsType;
  reactiveOptionsConfig: ReactiveOptionsConfig;
  filterFunction?: (options: SelectOption[], searchString: string) => SelectOption[];
}

// export const DEFAULT_EMPTY_OPTIONS_MESSAGE = 'No Items';
