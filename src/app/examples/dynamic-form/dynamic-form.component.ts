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
      options: [
        {label: 'Yes', value: 'y'},
        {label: 'No', value: 'n'}
      ],
      placeholder: 'Are you pregnant',
      showField: this.conditionalFields.watchControlForValues,
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
      showField: this.conditionalFields.watchControlForValues,
      displayConfig: {
        controlName: 'pregnancy',
        values: ['y']
      }
    },
    {
      controlType: 'input',
      label: 'Comments',
      controlName: 'comments',
      placeholder: 'Comment here',
      showField: this.conditionalFields.watchControlForValues,
      displayConfig: {
        controlName: 'pregnancyDuration',
        values: ['first']
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
