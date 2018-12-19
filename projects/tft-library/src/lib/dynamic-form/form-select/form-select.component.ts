import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectFieldConfig, SelectOption } from './select-field-config';
// import { Observable } from 'rxjs';

@Component({
  selector: 'tft-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {

  config: SelectFieldConfig;
  group: FormGroup;
  options: SelectOption[];
  // options$: Observable<any[]>;
  constructor( ) { }

  ngOnInit() {

    if (this.config.optionsCallback && this.config.optionsCallback instanceof Function) {
      this.config.optionsCallback().then( (options) => {
        this.options = options;
      });
    } else if (this.config.options && Array.isArray(this.config.options)) {
      this.options = this.config.options;
    } else {
      this.options =  [{label: 'No Items', value: null }];
    }
  }
}

