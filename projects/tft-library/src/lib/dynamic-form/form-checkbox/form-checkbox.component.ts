import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { CheckboxFieldConfig } from './checkbox-field-config';

@Component({
  selector: 'tft-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class FormCheckboxComponent implements OnInit {

  config: CheckboxFieldConfig;
  group: FormGroup;
  labelPosition: 'before' | 'after';
  inline: boolean;

  constructor() { }

  ngOnInit() {
    this.labelPosition = this.config.labelPosition || 'after';
    this.inline = this.config.inline || false;
  }
}
