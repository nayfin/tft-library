import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { SelectFieldConfig, SelectOption } from './select-field-config';
import { observablifyOptions } from '../dynamic-form.helpers';

@Component({
  selector: 'tft-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent implements OnInit {

  config: SelectFieldConfig;
  group: FormGroup;
  options$: Observable<SelectOption[]>;

  constructor( ) { }

  ngOnInit() {
    // If options are passed in as a function that returns a promise then account for that
    this.options$ = observablifyOptions(this.config, this.group);
  }
}

