import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormGroup, AbstractControl } from '@angular/forms';
import { AutocompleteFieldConfig } from './autocomplete-field-config';
import { SelectOption } from '../form-select/select-field-config';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { observablifyOptions } from '../dynamic-form.utils';

@Component({
  selector: 'tft-form-select',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAutocompleteComponent implements OnInit {

  @ViewChild('autoInput', { read: MatAutocompleteTrigger, static: true }) autoInput: MatAutocompleteTrigger;

  config: AutocompleteFieldConfig;
  group: FormGroup;
  get control(): AbstractControl {
    return this.group.get(this.config.controlName);
  }
  options$: Observable<SelectOption[]>;
  filteredOptions$: Observable<SelectOption[]>;

  constructor() { }

  ngOnInit() {
    // sort out if options are passed in as an Observable, Array, or Promise then convert it into an observable
    this.options$ = observablifyOptions(this.config.options);

    this.filteredOptions$ = this.control.valueChanges.pipe(
      map(value => value || ''),
      switchMap((searchString: string) => {
        return this.options$.pipe(
          map((options: SelectOption[]) => {
            return this.defaultFilterFunction(options, searchString);
          })
        );
      })
    );
  }

  displayLabel(options: SelectOption[]) {
    return (value: any) => {
      const correspondingOption = Array.isArray(options) ? options.find(option => option.value === value) : null;
      return correspondingOption ? correspondingOption.label : '';
    };
  }

  handleBlur(event: FocusEvent) {
    if (this.autoInput.activeOption) {
      this.autoInput.activeOption.select();
      this.control.setValue(this.autoInput.activeOption.value);
    }
  }

  defaultFilterFunction(options: SelectOption[], searchString: string)  {
    return options.filter(option => option.label && option.label.toLowerCase().includes(searchString.toLowerCase()));
  }
}

