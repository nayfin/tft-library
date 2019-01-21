import { DynamicFieldConfig } from '../dynamic-field-config';
import { Observable } from 'rxjs';

export interface ChecklistFieldConfig extends DynamicFieldConfig {
  emptyOptionsMessage?: string;
  // optionsCallback?: () => Promise<SelectOption[]>;
  // options$?: Observable<any[]>;
}

// export interface SelectOption {
//   label: string;
//   value: any;
// }

export const DEFAULT_EMPTY_OPTIONS_MESSAGE = 'No Items';
