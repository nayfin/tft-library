import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DEFAULT_EMPTY_OPTIONS_MESSAGE } from './autocomplete-field-config';
import { AutocompleteFieldConfig, AutocompleteOption } from './autocomplete-field-config';
import { Observable, of, isObservable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


@Component({
  selector: 'tft-form-select',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAutocompleteComponent implements OnInit {

  @ViewChild('autoInput', { read: MatAutocompleteTrigger}) autoInput: MatAutocompleteTrigger;

  config: AutocompleteFieldConfig;
  group: FormGroup;
  get control(): AbstractControl{
    return this.group.get(this.config.controlName);
  }
  options$: Observable<AutocompleteOption[]>;
  filteredOptions$: Observable<AutocompleteOption[]>;

  constructor() { }

  ngOnInit() {
    // sort out if options are passed in as an Observable, Array, or Promise then convert it into an observable
    this.options$ = this.config.options instanceof Function
                  ? from(this.config.options().then(options => options)) as Observable<AutocompleteOption[]>
                  : Array.isArray(this.config.options)
                  ? of(this.config.options) as Observable<AutocompleteOption[]>
                  : isObservable(this.config.options)
                  ? this.config.options as Observable<AutocompleteOption[]>
                  : of([{
                    label: this.config.emptyOptionsMessage || DEFAULT_EMPTY_OPTIONS_MESSAGE,
                    value: null
                    }]);

    this.filteredOptions$ = this.control.valueChanges.pipe(
      map(value => value || ''),
      switchMap((searchString: string) => {
        return this.options$.pipe(
          map((options: AutocompleteOption[]) => {
            return this.defaultFilterFunction(options, searchString);
          })
        );
      })
    );
  }

  displayLabel(options: AutocompleteOption[]) {
    return (value: any) => {
      const correspondingOption = Array.isArray(options) ? options.find(option => option.value === value) : null;
      return correspondingOption ? correspondingOption.label : '';
    }
  }

  handleBlur(event: FocusEvent) {
    if (this.autoInput.activeOption) {
      this.autoInput.activeOption.select();
      this.control.setValue(this.autoInput.activeOption.value);
    }
  }

  defaultFilterFunction(options: AutocompleteOption[], searchString: string)  {
    return options.filter(option => option.label && option.label.toLowerCase().includes(searchString.toLowerCase()));
  }
}

