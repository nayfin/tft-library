
/**
 * DYNAMIC FORM UTILS: a collection of pure/mostly pure functions that are useful both internally and for 
 * developing the consuming app. 
 * 
 * They are sorted by use case: building out the form object; helper functions to use with the showField function; 
 * helper functions to use with the compute field function; and other logic shared between components
 */

import { 
  SelectFieldConfig,
  SelectOption,
  DEFAULT_EMPTY_OPTIONS_MESSAGE,
  OptionsCallback,
  AnyFieldConfig,
  FormConfig,
  ControlType,
  FormGroupListConfig,
  DynamicFieldConfig
} from './models';
import {
  from,
  Observable,
  of,
  isObservable,
  combineLatest,
  OperatorFunction
} from 'rxjs';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { valueIn } from './dynamic-form.operators';
import { map, tap, startWith } from 'rxjs/operators';
import { AutocompleteFieldConfig } from './models';


/**
 * Required configuration to use with checkControlForValues function
 */
export interface CheckControlConfig {
  // the control name to watch
  controlName: string;
  // the values to watch for
  values: string[];
  // the function to run on the boolean returned by the watcher
  evaluate?: (isValueInValues: boolean) => boolean;
}
 
/**
* Watches a single control for a list of values, returns true when field value matches any value in list 
* unless an evaluate method is found on config, in which case that method is run on the returned boolean value
* @param group the direct parent of the field we want to watch
* @param config
*/
export function checkControlForValues(group: FormGroup, config: CheckControlConfig): Observable<boolean> {
  // check that all the pieces we need are available
  if (config && config.controlName && Array.isArray(config.values)) {
    return getValueChanges(group, config.controlName).pipe(
      // return a boolean, true if value is in the values being watch for, otherwise false
      valueIn(config.values),
      map((isValueInValues: boolean) => {
        // since we can only check if the value is in the list of watched values, the evaluate function gives us
        // a chance to make other decisions based on if the boolean returned, e.g. return true if value not in watched values
        if ( config.evaluate && config.evaluate instanceof Function ) {
          return config.evaluate(isValueInValues);
        } else { return isValueInValues; }
      })
    );
  } else {
    return of(true);
  }
}

/**
 * The required configuration for running the checkControlsForValues function.
 */
export interface CheckControlsConfig {
  // an array of controls to watch and the values to check for
  watchConfigs: CheckControlConfig[];
  // the function to run against the array of current field valueIn responses
  evaluate?: ( bools: boolean[] ) => boolean;
}
/**
 * Watches a list of fields for individual lists of values returning true when any field contains one
 * of the values being watched for, or optionally running a function on the array of resolved booleans
 * from the listed fields and returning a boolean
 * @param group the form group that has the fields to watch as direct descendants
 * @param config the configuration to use when calling the function
 */
export function checkControlsForValues(group: FormGroup, config: CheckControlsConfig): Observable<any> {
  // if no config is passed we just want to show the field, so we return an observable of true
  if (!config || !config.watchConfigs) { return of(true); }
  // we run checkControlForValues on every control in the list of WatchConfigs creating 
  // an array of Observable watching fields for values
  const fieldTriggers = config.watchConfigs.map(watchConfig => {
    // resolves a boolean, true when field value matches a watched value, otherwise false
    return checkControlForValues(group, watchConfig);
  });

  return combineLatest(
    fieldTriggers
  ).pipe(
    startWith([true]),
    map((booleans: boolean[]) => {
      // if the user passed an evaluate function use it
      if (config.evaluate && config.evaluate instanceof Function) {
        return config.evaluate(booleans);
      } else { // otherwise we return true if any of the watched fields resolve to true
        return booleans.some(bool => bool);
      }
    })
  );
}


/**
 * The required configuration when running the computeValue function
 */
export interface ComputeFieldConfig {
  // the name of the control to compute, defaults to the controlName of the configured field
  controlNameToSet?: string;
  // array of control names who's values we want to watch
  controlNamesToWatch: string[];
  // the function we want to call on the array of watched values to compute the value of the control we 
  computeCallback: (
    values: (string | number)[]
  ) => string | number;
}

/**
   * Watches values on an array of fields, computing their values as they change 
   * @param group the group to get the fields from, for now it can only be the parent of the computed field
   * @param computeFieldsConfig the configuration that drives the computation, holds the names to watch and the 
   * computation function that get called against the array of values
   */
  export function computeValueFromFields(group: FormGroup, computeFieldsConfig: ComputeFieldConfig): Observable<any> {
    // TODO: better checking
    const { controlNamesToWatch, controlNameToSet } = computeFieldsConfig;
    const controlToSet = group.get(controlNameToSet);
    const valueChanges = controlNamesToWatch.map(controlNameToWatch => getValueChanges(group, controlNameToWatch));
    return combineLatest(
      valueChanges
    ).pipe(
      // we run the compute callback on the array of field values to reduce them to the single value for our computed field
      map(valuesArray => computeFieldsConfig.computeCallback(valuesArray)),
      tap(valueToSet => controlToSet.setValue(valueToSet))
    );
  }

/**
 * A simple wrapper for doing error checking around getting the valueChanges observable from a control on a form group
 * @param group the form group we want to pull the observable from
 * @param controlName the name of the control who's value we want to subscribe to
 */
function getValueChanges(group: FormGroup, controlName: string) {
    const control = group.get(controlName);
    if (!control) {
      throw new Error(`No control with controlName ${controlName}`, );
    }
    return control.valueChanges;
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
export function observablifyOptions(
  config: SelectFieldConfig | AutocompleteFieldConfig, 
  group?: FormGroup
):  Observable<SelectOption[]> {
  const {options, reactiveOptionsConfig, emptyOptionsMessage} = config;
  // TODO: there must be a better way of doing this, not a fan of if or switch solutions though
  const options$ = reactiveOptionsConfig && options instanceof Function
  ? options(group, reactiveOptionsConfig)
  : options instanceof Function
  ? from( (options as OptionsCallback)())
  : Array.isArray(options)
  ? of(options)
  : isObservable(options)
  ? options
  : of([{
    label: emptyOptionsMessage || DEFAULT_EMPTY_OPTIONS_MESSAGE,
    value: null
    }]);
    return options$ as Observable<SelectOption[]>
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
      // if there's a value object and it has a value for this field (including zero), use it. Otherwise, default to null 
      const controlValue = value && isRealValue(value[controlName])
                         ? value[controlName]
                         : null;
      group.addControl(controlConfig.controlName, createControlForType(controlConfig, controlValue));
    }
  });
  return group;
}
/**
 * Analyze the config and build a form control to spec. Notice we don't use FormBuilder here 
 * as we want to keep this function pure.
 * @param controlConfig the configuration object for the control to build
 * @param value an initial value to use if passed in
 */
export function createControlForType(controlConfig: AnyFieldConfig, value: any) {
  // build form control out based on the control type
  const control = controlConfig.controlType === ControlType.GROUP
    ? buildFormGroupFromConfig(controlConfig as FormConfig, value)
    : controlConfig.controlType === ControlType.GROUP_LIST
    ? new FormArray([], (controlConfig as FormGroupListConfig).validators)
    : new FormControl(
      isRealValue(value) ? value : null,
      (controlConfig as DynamicFieldConfig).validators || null
    );
  // if it was a GROUP_LIST and it had initial values passed in, add the values to the form array
  if (controlConfig.controlType === ControlType.GROUP_LIST && Array.isArray(value)) {
    value.forEach( item => {
      (control as FormArray).push( createControlForType((controlConfig as FormGroupListConfig).itemConfig, item));
    });
  }
  return control;
}

/**
 * returns true for all truthy values AND zero
 * sometimes you need the value zero
 * @param value the value to evaluate
 */
function isRealValue(value: any) {
  return !!value || value === 0;
}
