import { DynamicFieldConfig } from '../models';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

export interface SelectFieldConfig extends DynamicFieldConfig {
  emptyOptionsMessage?: string;
  reactiveOptionsConfig: ReactiveOptionsConfig;
  multiple?: boolean;
  options: OptionsType;
}

export type OptionsType = SelectOption[] | Observable<SelectOption[]> | OptionsCallback | ReactiveOptionsCallback;

export type OptionsCallback = () => Promise<SelectOption[]>;
export type ReactiveOptionsCallback =  (group?: FormGroup, config?: ReactiveOptionsConfig) => Observable<SelectOption[]>
export interface SelectOption {
  label: string;
  value: any;
}


export interface ReactiveOptionsConfig {
  controlNamesToWatch: string[];
}
export const DEFAULT_EMPTY_OPTIONS_MESSAGE = 'No Items';
