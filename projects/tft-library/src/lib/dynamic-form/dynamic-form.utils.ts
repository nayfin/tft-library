import { OptionsType, SelectOption, DEFAULT_EMPTY_OPTIONS_MESSAGE } from './form-select/select-field-config'
import { from, Observable, of, isObservable } from 'rxjs';

export function observablifyOptions(options: OptionsType, emptyMessageOption?: string) {
  return options instanceof Function
  ? from(options().then(promiseOptions => promiseOptions)) as Observable<SelectOption[]>
  : Array.isArray(options)
  ? of(options) as Observable<SelectOption[]>
  : isObservable(options)
  ? options as Observable<SelectOption[]>
  : of([{
    label: emptyMessageOption || DEFAULT_EMPTY_OPTIONS_MESSAGE,
    value: null
    }]);
}
