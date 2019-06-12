import { OptionsType, SelectOption, DEFAULT_EMPTY_OPTIONS_MESSAGE } from './form-select/select-field-config'
import { from, Observable, of, isObservable, combineLatest, OperatorFunction } from 'rxjs';
import { AnyFieldConfig, FormConfig, ControlType, FormGroupListConfig, DynamicFieldConfig, DisplayFieldConfig, WatchControlConfig, ComputeFieldConfig } from './dynamic-field-config';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { valueIn } from './conditional-fields.operators';
import { map, tap, startWith } from 'rxjs/operators';

/**
 * DYNAMIC FORM UTILS: a collection of pure/mostly pure functions that are useful both internally and for developing the consuming app.
 * Sorted by use case: building out the form object; helper functions to use with the showField function; helper functions
 * to use with the compute field function; and other logic shared between components
 * 
 */


 
/**
* Watches a single control for a list of values, returns true when field value matches any value in list 
* unless an evaluate method is found on config, in which case that method is run on the value
* @param group
* @param config
*/
export function watchControlForValues(group: FormGroup, config: WatchControlConfig): Observable<boolean> {
  // TODO: better checking
  if (config && config.controlName && Array.isArray(config.values)) {
    return getValueChanges(group, config.controlName).pipe(
      valueIn(config.values),
      map((bool: boolean) => {
        if ( config.evaluate ) return config.evaluate(bool);
        else return bool;
      })
    )
  } else {
    return of(true);
  }
}

export function watchControlsForValues(group: FormGroup, config: DisplayFieldConfig): Observable<any> {
  // if no config is passed we just want to show the field, so we return an observable of true
  if (!config || !config.watchConfigs) return of(true);
  // build our list of 
  const fieldTriggers = config.watchConfigs.map(watchConfig => {
    return watchControlForValues(group, watchConfig);
  });

  return combineLatest(
    fieldTriggers
  ).pipe(
    startWith([true]),
    map((booleans: boolean[]) => {
      // if th
      if (config.evaluate && config.evaluate instanceof Function) return config.evaluate(booleans);
      else return booleans.some(bool => bool);
    })
  )
}

/**
   * Watches values on an array of fields, computing their values as they change 
   * @param group the group to get the fields from, for now it can only be the parent of the computed field
   * @param computeFieldsConfig the configuration that drives the computation, holds the names to watch and the 
   * computation function that get called against the array of values
   */
  export function computeValue(group: FormGroup, computeFieldsConfig: ComputeFieldConfig): Observable<any> {
    // TODO: better checking
    const { controlNamesToWatch, controlNameToSet } = computeFieldsConfig;
    const controlToSet = group.get(controlNameToSet);
    const valueChanges = controlNamesToWatch.map(controlNameToWatch => getValueChanges(group, controlNameToWatch));
    return combineLatest(
      valueChanges
    ).pipe(
      tap(valuesArray => {
        const value = computeFieldsConfig.computeCallback(valuesArray);
        controlToSet.setValue(value);
      })
    );
  }

/**
 * A simple wrapper for doing error checking around getting the valueChanges observable from a control on a form group
 * @param group the form group we want to pull the observable from
 * @param controlName the name of the control who's value we want to subscribe to
 */
function getValueChanges(group: FormGroup, controlName: string) {
  try {
    const control = group.get(controlName);
    return control.valueChanges;
  } catch {
    console.error(`No control with control name: ${controlName}`, { availableControls: group.controls });
    return of(null);
  }
}
/**
 *  Allows developer to pass an array of operators into the pipe of an Observable. 
 *  Useful for creating function with a variable amount of operators to be run
 * @param observable the observable to pass the operators to 
 * @param operators array of operators to pipe
 */
function pipeOperatorsIntoObservable(observable: Observable<any>, operators: OperatorFunction<any, any>[]) {
  try {
    return operators.reduce((obs: Observable<{}>, op: OperatorFunction<{}, {}>) => {
      return obs.pipe(op);
    }, observable);
  } catch {
    console.error('Unable to pipe operators into observable');
    return of(null);
  }
}
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

/**
 * 
 * @param config a configuration for a form group
 * @param value an object of initial values to pass in
 * @param group the form group to modify and build out
 */
export function buildFormGroupFromConfig(config: FormConfig, value: any = null, group: FormGroup = new FormGroup({}) ) {

  config.fields.forEach( (controlConfig: AnyFieldConfig) => {
    // if it's not a button config
    if (controlConfig.controlType !== ControlType.BUTTON) {
    // then add a control to the group using the controlName from configuration
      const {controlName} = controlConfig;
      // if there's a value object and it has a value for this field, use it. Otherwise, default to null 
      const controlValue = value && isRealValue(value[controlName])
                         ? value[controlName]
                         : null;  
      group.addControl(controlConfig.controlName, createControlForType(controlConfig, controlValue));
    }
  });
  return group;
}
/**
 * Analyze the config and build a form control to spec
 * @param controlConfig the configuration object for the control to build
 * @param value an initial value to use if passed in
 */
export function createControlForType(controlConfig: AnyFieldConfig, value: any) {
  // build form control out based on the control type
  const control = controlConfig.controlType === ControlType.GROUP
    ? this.buildFormGroupFromConfig(controlConfig as FormConfig, value)
    : controlConfig.controlType === ControlType.GROUP_LIST
    ? new FormArray([], (controlConfig as FormGroupListConfig).validators)
    : new FormControl(
      isRealValue(value) ? value : null,
      (controlConfig as DynamicFieldConfig).validators || null
    );
  // if it was a GROUP_LIST and it had initial values passed in, add the values to the form array
  if (controlConfig.controlType === ControlType.GROUP_LIST && Array.isArray(value)) {
    value.forEach( item => {
      (control as FormArray).push( this.createControlForType((controlConfig as FormGroupListConfig).itemConfig, item));
    });
  }
  return control;
}

/**
 * returns true for all truthy values and zero
 * sometimes you need the value zero
 * @param value the value to evaluate
 */
function isRealValue(value: any) {
  return !!value || value === 0;
}
