import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

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
      placeholder: 'Select an option',
    },
    {
      controlType: 'select',
      label: 'Are you pregnant',
      controlName: 'pregnancy',
      options: [
        {label: 'Yes', value: 'y'},
        {label: 'No', value: 'n'}
      ],
      placeholder: 'Select an option',
      displayConfig: {
        controlName: 'gender',
        values: ['female']
      }
    },
    {
      label: 'Submit',
      controlName: 'submit',
      controlType: 'button',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  formSubmitted(formValue) {
    console.log('formValue', formValue);
  }
}
