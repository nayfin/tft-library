import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { valueIn } from './conditional-fields.operators';

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
    if (config) {
      return form.get(config.controlName).valueChanges.pipe(
        valueIn(config.values)
      );
    } else {
      return of(true);
    }
  }
}
