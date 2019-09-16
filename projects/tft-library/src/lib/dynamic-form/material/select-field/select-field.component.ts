import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { SelectFieldConfig, SelectOption } from '../../models';
import { observablifyOptions } from '../../dynamic-form.helpers';

@Component({
  selector: 'tft-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent implements OnInit {

  config: SelectFieldConfig;
  group: FormGroup;
  options$: Observable<SelectOption[]>;

  constructor( ) { }

  ngOnInit() {
    // options$ can be passed as an array, promise that resolves array, or observable that resolves array
    // this functions accounts for all possibilities and converts to observable that resolves array
    this.options$ = observablifyOptions(this.config, this.group);
  }
}

