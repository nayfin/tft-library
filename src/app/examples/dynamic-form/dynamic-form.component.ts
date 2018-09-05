import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { ConditionalFieldsService, WatchControlConfig } from 'projects/tft-library/src/lib/dynamic-form/conditional-fields.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  config = [
    {
      controlType: 'input',
      label: 'First name',
      controlName: 'firstName',
      placeholder: 'Enter your first name',
      validators: [Validators.required]
    },
    {
      controlType: 'input',
      label: 'Last name',
      controlName: 'lastName',
      placeholder: 'Enter your last name',
    },
    {
      controlType: 'select',
      label: 'Gender',
      controlName: 'gender',
      options: [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'}
      ],
      placeholder: 'Select gender',
    },
    {
      controlType: 'select',
      label: 'Pregnancy Status',
      controlName: 'pregnancy',
      showField: this.conditionalFields.watchControlForValues,
      options: [
        {label: 'Yes', value: 'y'},
        {label: 'No', value: 'n'}
      ],
      placeholder: 'Are you pregnant',
      displayConfig: {
        controlName: 'gender',
        values: ['female']
      }
    },
    {
      controlType: 'input',
      label: 'Pregnancy Duration',
      controlName: 'pregnancyDuration',
      placeholder: 'What trimester',
      displayConfig: {
        controlName: 'pregnancy',
        values: ['y']
      }
    },
    {
      label: 'Submit',
      controlName: 'submit',
      controlType: 'button',
    },
  ];

  constructor(
    private conditionalFields: ConditionalFieldsService,
  ) { }

  ngOnInit() {
  }

  formSubmitted(formValue) {
    console.log('formValue', formValue);
  }
}
