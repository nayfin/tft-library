import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { valueIn } from './custom-operators';
import { map } from 'rxjs/operators';

export interface WatchControlConfig {
  controlName: string;
  values: string[];
}

@Injectable({
  providedIn: 'root'
})

export class ConditionalFieldsService {

  constructor() { }

  watchControlForValues( form: FormGroup, config: WatchControlConfig ): Observable<boolean> {
    if (config ) {
      return form.get(config.controlName).valueChanges.pipe(
        valueIn(config.values)
      );
    } else {
      return of(true);
    }
  }
  /**
   *
   * used to pass formGroup and an optional configaration file to
   *
   * @param group used to get valueChanges from control
   * @example group.get('<controlName>').values changes
   * @param config configuration object used to
   */
  connectShowField( group: FormGroup, config) {
    const displayConfig = config.displayConfig;
    return config.showField
      ? config.showField( group, displayConfig || null)
      : of(true);
  }
}
