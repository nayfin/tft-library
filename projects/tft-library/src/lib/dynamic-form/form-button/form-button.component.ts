import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFieldConfig } from '../dynamic-field-config';

@Component({
  selector: 'tft-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormButtonComponent implements OnInit {

  config: DynamicFieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }
}
