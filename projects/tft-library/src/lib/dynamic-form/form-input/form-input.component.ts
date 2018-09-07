import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputFieldConfig } from './input-field-config';
import { Observable } from 'rxjs';
import { ConditionalFieldsService } from '../conditional-fields.service';

@Component({
  selector: 'tft-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})

export class FormInputComponent implements OnInit {

  config: InputFieldConfig;
  group: FormGroup;

  showField: Observable<boolean>;

  constructor(
    private conditionalFields: ConditionalFieldsService
  ) { }

  ngOnInit() {
    // console.log('group', this.group);
    this.showField = this.conditionalFields.connectShowField(this.group, this.config);

  }
}
