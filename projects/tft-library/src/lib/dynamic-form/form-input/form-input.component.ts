import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { InputFieldConfig } from './input-field-config';

@Component({
  selector: 'tft-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class FormInputComponent implements OnInit {

  config: InputFieldConfig;
  group: FormGroup;
  inputType: string;
  constructor(
  ) { }

  ngOnInit() {
    this.inputType = this.config.inputType || 'text';
  }
}
