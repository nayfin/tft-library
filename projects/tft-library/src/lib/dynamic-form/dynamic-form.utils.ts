import { OptionsType, SelectOption, DEFAULT_EMPTY_OPTIONS_MESSAGE } from './form-select/select-field-config'
import { from, Observable, of, isObservable } from 'rxjs';

/**
 * The user can give us select options as an array, a function that resolves to a promise,
 * or an observable. This functions consumes any of those and returns an observable that 
 * resolves an array of options
 * 
 * @param options the options passed in from the config
 * @param emptyMessageOption the message to display when the array is empty
 */
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
