import { Injectable } from '@angular/core';
import { of, Observable, combineLatest, OperatorFunction } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { valueIn } from './conditional-fields.operators';
import { tap } from 'rxjs/operators';
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

  carryForwardValue(group: FormGroup, computeFieldsConfig: CarryForwardConfig): Observable<boolean> {
    // TODO: better checking
    const {controlNameToWatch, controlNameToSet} = computeFieldsConfig;
    const controlToSet = group.get(controlNameToSet);
    const valueChanges = getValueChanges(group, controlNameToWatch);
    console.log({controlToSet, valueChanges});
    return pipeOperatorsIntoObservable(valueChanges, [
      tap((watchedValue) => {
        console.log({watchedValue});
        controlToSet.setValue(watchedValue);
      })
    ]);
  }
}

interface CarryForwardConfig {
  controlNameToWatch: string;
  controlNameToSet: string;
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
