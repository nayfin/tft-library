import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';


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
        map( (value) => {
          return config.values.includes(value);
        })
      );
    } else {
      return of(true);
    }
  }

  connectShowField( group: FormGroup, config) {
    const displayConfig = config.displayConfig;
    return config.showField
    ? config.showField( group, displayConfig || null)
    : of(true);
  }
}
