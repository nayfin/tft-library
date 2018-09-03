import { Injectable } from '@angular/core';
import { DisplayConfig } from './dynamic-field-config';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConditionalFieldsService {

  constructor() { }

  createWatcher( displayConfig: DisplayConfig, form: FormGroup ): Observable<boolean> {
    if (displayConfig ) {
      return form.get(displayConfig.controlName).valueChanges.pipe(
        map( (value) => {
          return displayConfig.values.includes(value);
        })
      );
    } else {
      return of(true);
    }
  }
}
