import { DynamicFieldConfig } from '../dynamic-field-config';
import { Observable } from 'rxjs';

export interface AutocompleteFieldConfig extends DynamicFieldConfig {
  emptyOptionsMessage?: string;
  multiple?: boolean;
  options: OptionsType;
  // optionsCallback?: () => Promise<AutocompleteOption[]>;
  // options$?: Observable<any[]>;
}

export type OptionsType = (() => Promise<AutocompleteOption[]>) | AutocompleteOption[] | Observable<AutocompleteOption[]>

export interface AutocompleteOption {
  label: string;
  value: any;
}

export const DEFAULT_EMPTY_OPTIONS_MESSAGE = 'No Items';
