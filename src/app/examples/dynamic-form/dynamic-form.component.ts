import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  config = [
    {
      type: 'input',
      label: 'First name',
      name: 'firstName',
      placeholder: 'Enter your first name',
    },
    {
      type: 'input',
      label: 'Last name',
      name: 'lastName',
      placeholder: 'Enter your last name',
    },
    {
      type: 'select',
      label: 'Favourite food',
      name: 'food',
      options: [
        {label: 'Pizza', value: 'pizza'},
        {label: 'Coffee', value: 'coffee'},
        {label: 'Curry', value: 'curry'},
      ],
      placeholder: 'Select an option',
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  formSubmitted(formValue) {
    console.log('formValue', formValue);
  }
}
