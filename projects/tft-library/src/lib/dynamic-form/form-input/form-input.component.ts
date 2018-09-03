import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputFieldConfig } from './input-field-config';

@Component({
  selector: 'tft-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})

export class FormInputComponent implements OnInit {

  config: InputFieldConfig;
  group: FormGroup;

  get displayControl() {
    // console.log('config', this.config.displayConfig);
    const displayConfig = this.config.displayConfig;
    if (!displayConfig ) {
      return true;
    } else {
      this.checkControlForValues(displayConfig.controlName, displayConfig.values);
    }
  }
  constructor() { }

  ngOnInit() {
    // console.log('group', this.group);
  }

  checkControlForValues(controlName: string, values: string[]) {
    return values.includes(this.group.get(controlName).value);
  }
}
