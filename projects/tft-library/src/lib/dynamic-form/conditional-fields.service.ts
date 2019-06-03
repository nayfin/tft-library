import { Injectable } from '@angular/core';
import { of, Observable, combineLatest, OperatorFunction } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { valueIn } from './conditional-fields.operators';
import { tap } from 'rxjs/operators';
import { ComputeFieldConfig } from './dynamic-field-config';
// import { map, tap, debounceTime } from 'rxjs/operators';

export interface WatchControlConfig {
  controlName: string;
  values: string[];
}

@Injectable({
  providedIn: 'root'
})

export class ConditionalFieldsService {

  constructor() { }
  /**
   * ** DEPRACATED ** use `displayWhen(watchControl(config, group))
   * @param group
   * @param config
   */
  watchControlForValues(group: FormGroup, config: WatchControlConfig): Observable<boolean> {
    // TODO: better checking
    if (config && config.controlName && Array.isArray(config.values)) {
      const valueChanges = getValueChanges(group, config.controlName);
      return pipeOperatorsIntoObservable(valueChanges, [valueIn(config.values)]);
    } else {
      return of(true);
    }
  }
  /**
   * 
   * @param group 
   * @param computeFieldsConfig 
   */
  computeValue(group: FormGroup, computeFieldsConfig: ComputeFieldConfig): Observable<any> {
    // TODO: better checking
    const {controlNamesToWatch, controlNameToSet} = computeFieldsConfig;
    const controlToSet = group.get(controlNameToSet);
    const valueChanges = controlNamesToWatch.map(controlNameToWatch => getValueChanges(group, controlNameToWatch));
    return combineLatest(
      valueChanges
    ).pipe(
      tap( valuesArray => {
        const value = valuesArray.reduce((acc: any, curr: any, i: number, arr: any[]) => {
          return computeFieldsConfig.reducer(acc, curr, i, arr);
        }, computeFieldsConfig.initialAccumulator || valuesArray[0]);
        console.log(valuesArray, value);
        controlToSet.setValue(value);
      })
    );
  }
}

function getValueChanges(group: FormGroup, controlName: string) {
  try {
    const control = group.get(controlName);
    return control.valueChanges;
  } catch {
    console.error(`No control with control name: ${controlName}`, {availableControls: group.controls});
    return of(null);
  }
}
/**
 *  Allows developer to pass an array of operators into the pipe of an Observable. 
 *  Useful for creating function with variable count of operators to be run
 * @param observable the observable to pass the operators to 
 * @param operators array of operators to pipe
 */
function pipeOperatorsIntoObservable(observable: Observable<any>, operators: OperatorFunction<any, any>[] ) {
  try {
    return operators.reduce((obs: Observable<{}>, op: OperatorFunction<{}, {}>) => {
      return obs.pipe(op);
    }, observable);
  } catch {
    console.error('Unable to pipe operators into observable');
    return of(null);
  }
}
