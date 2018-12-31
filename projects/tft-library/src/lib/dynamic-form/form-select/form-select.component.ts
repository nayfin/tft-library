import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DEFAULT_EMPTY_OPTIONS_MESSAGE } from './select-field-config';
import { SelectFieldConfig, SelectOption } from './select-field-config';

@Component({
  selector: 'tft-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent implements OnInit {

  config: SelectFieldConfig;
  group: FormGroup;
  options: SelectOption[];

  // options$: Observable<any[]>;
  constructor( ) { }

  ngOnInit() {
    // If options are passed in as a function that returns a promise then account for that
    if (this.config.optionsCallback && this.config.optionsCallback instanceof Function) {
      this.config.optionsCallback().then( (options) => {
        this.options = options;
      });
    // if it's an array of options handle that
    } else if (this.config.options && Array.isArray(this.config.options)) {
      this.options = this.config.options;
    // if it's empty desplay a message
    } else {
      this.options =  [
        {
        label: this.config.emptyOptionsMessage || DEFAULT_EMPTY_OPTIONS_MESSAGE,
        value: null
        }
      ];
    }
  }
}

