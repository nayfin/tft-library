import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { ConditionalFieldsService } from 'projects/tft-library/src/lib/dynamic-form/conditional-fields.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  // TODO: Find good way to strongly type this
  config = [
    {
      controlType: 'input',
      label: 'First name',
      controlName: 'firstName',
      placeholder: 'Enter your first name',
      attrs: [{
        name: 'value',
        value: 'toads'
      }],
      classes: ['wide-field'],
      validators: [Validators.required],
    },
    {
      controlType: 'input',
      label: 'Last name',
      controlName: 'lastName',
      placeholder: 'Enter your last name',
      // using custom function from below
      // note that because function doesn't require a displayConfig, control config doesn't have a displayConfig prop
      showField: this.firstNameIsNotBlank
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
      // using a helper function from the conditionalFields service
      showField: this.conditionalFields.watchControlForValues,
      // and the corresponding configuration
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
  // example of how to pass a custom function that returns an Observable that resolves a boolean
  // notice lack of subcribe() call, the field component manages subcription for you
  firstNameIsNotBlank( form: FormGroup): Observable<boolean> {
    return form.get('firstName').valueChanges.pipe(
      map( value => !!value.length )
    );
  }
}
