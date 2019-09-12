import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormGroup, AbstractControl } from '@angular/forms';
import { SelectOption, AutocompleteFieldConfig } from '../../models';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { observablifyOptions } from '../../dynamic-form.helpers';

@Component({
  selector: 'tft-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteFieldComponent implements OnInit {

  @ViewChild('autoInput', { read: MatAutocompleteTrigger, static: true }) autoInput: MatAutocompleteTrigger;

  config: AutocompleteFieldConfig;
  group: FormGroup;
  options$: Observable<SelectOption[]>;
  filteredOptions$: Observable<SelectOption[]>;
  get control(): AbstractControl {
    return this.group.get(this.config.controlName);
  }

  constructor() { }

  ngOnInit() {
    // sort out if options are passed in as an Observable, Array, or Promise then convert it into an observable
    this.options$ = observablifyOptions(this.config, this.group);
    // filter options by the search string using either the default filter function or one passed in through config
    this.filteredOptions$ = this.control.valueChanges.pipe(
      // this prevents errors when value changes is not a string because the filter function is expecting on
      map(value => value || ''),
      switchMap((searchString: string) => {
        return this.options$.pipe(
          map((options: SelectOption[]) => {
            // check for filter function passed in through config
            if (this.config.filterFunction && this.config.filterFunction instanceof Function) {
              try {
                // use if found
                return this.config.filterFunction(options, searchString);
              } catch (error) {
                console.error(error, 'Error running filterFunction, falling back to default filter');
              } 
            }
            // fallback to default in the absence of custom filter function or on error
            return this.defaultFilterFunction(options, searchString);
          })
        );
      })
    );
  }
  /**
   * The material autocomplete defaults to displaying the options value instead of its label.
   * We only have the value from the selected option to work with, so we have to pass the options
   * through a function called in the template and return the function that the material displayWith 
   * input is expecting.
   * @param options the array of options to search for option with corresponding value
   */
  displayLabel(options: SelectOption[]) {
    return (value: any) => {
      const correspondingOption = Array.isArray(options) ? options.find(option => option.value === value) : null;
      return correspondingOption ? correspondingOption.label : '';
    };
  }
  /**   
   * To follow ARIA standards we want to select the active option on blur.
   * @param event blur event that triggers the handle blur, TODO: remove this parameter if not used by 7/4/19
   */
  handleBlur(_event: FocusEvent) {
    if (this.autoInput.activeOption) {
      this.autoInput.activeOption.select();
      this.control.setValue(this.autoInput.activeOption.value);
    }
  }
  /**
   * A basic filter function that filters the search string against the label of the options object 
   * @param options the array of options to filter
   * @param searchString the string from the input 
   */
  defaultFilterFunction(options: SelectOption[], searchString: string)  {
    return options.filter(option => option.label && option.label.toLowerCase().includes(searchString.toLowerCase()));
  }
}

