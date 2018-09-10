import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputFieldConfig } from './input-field-config';

@Component({
  selector: 'tft-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})

export class FormInputComponent implements OnInit {

  config: InputFieldConfig;
  group: FormGroup;

  inputType: string;
  constructor(
  ) { }

  ngOnInit() {
    // console.log('group', this.group);
    this.inputType = this.config.inputType || 'text';
  }
}
