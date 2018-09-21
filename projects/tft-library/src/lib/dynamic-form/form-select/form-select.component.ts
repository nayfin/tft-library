import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectFieldConfig } from './select-field-config';

@Component({
  selector: 'tft-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {

  config: SelectFieldConfig;
  group: FormGroup;

  constructor( ) { }

  ngOnInit() {
  }
}

