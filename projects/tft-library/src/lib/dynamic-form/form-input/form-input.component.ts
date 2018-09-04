import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputFieldConfig } from './input-field-config';
import { DisplayConfig } from '../dynamic-field-config';
import { Observable } from 'rxjs';
import { ConditionalFieldsService } from '../conditional-fields.service';

@Component({
  selector: 'tft-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})

export class FormInputComponent implements OnInit {

  config: InputFieldConfig;
  group: FormGroup;

  isControlDisplayed: Observable<boolean>;

  constructor(
    public conditionalFields: ConditionalFieldsService
  ) { }

  ngOnInit() {
    // console.log('group', this.group);
    const displayConfig: DisplayConfig = this.config.displayConfig;
    this.isControlDisplayed = this.conditionalFields.createWatcher(displayConfig, this.group);
  }
}
