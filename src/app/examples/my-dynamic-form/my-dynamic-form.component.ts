import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import {  AnyFieldConfig,
  //  ControlType,
 } from 'tft-library';
 import { ConditionalFieldsService } from 'tft-library';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Custom rxjs operator determines if string is blank after trim
 *
 * returns false if blank else true
 */
const isNotBlank = () => map( (value: string) => !!value.trim().length );

@Component({
  selector: 'app-my-dynamic-form',
  templateUrl: './my-dynamic-form.component.html',
  styleUrls: ['./my-dynamic-form.component.scss']
})
export class MyDynamicFormComponent implements OnInit {

  // the config holds an array of configurations for the fields you want to create
  // TODO: Figure out way to abstract the recursive types out of here
  config: (AnyFieldConfig | AnyFieldConfig[])[] = [
    // configuration will create an input field in the form with the following configuration
    {
      controlType: 'input',
      label: 'First name',
      inputType: 'text',
      controlName: 'firstName',
      placeholder: 'Enter your first name',
      classes: [],
      flexLayoutConfig: {fxFlex: 40},
      validators: [Validators.required],
    },
    // another input with conditional display logic
    // the showField parameter takes a function that that returns an observable that resolve to a boolean
    // expects form of type FormGroup as its first parameter and an optional configuration object as arguments
    // ( form: FormGroup, config?: any ) => Observable<boolean>
    // you get the observable from form.get('someControlName').valueChanges
    // as demonstrated in this.firstnameIsNotBlank, and implement below
    {
      controlType: 'input',
      label: 'Last name',
      controlName: 'lastName',
      placeholder: 'Enter your last name',
      flexLayoutConfig: {fxFlex: 40},
      // note that because function doesn't require a displayConfig, control config doesn't have a displayConfig prop
      showField: this.firstNameIsNotBlank
    },
    // Example of group within a group. We can handle configs recursively now!!!
    [
      {
        controlType: 'input',
        label: 'First name',
        inputType: 'text',
        controlName: 'firstName',
        placeholder: 'Enter your first name',
        classes: [],
        flexLayoutConfig: {fxFlex: 40},
        validators: [Validators.required],
      },
      {
        controlType: 'input',
        label: 'Last name',
        controlName: 'lastName',
        placeholder: 'Enter your last name',
        flexLayoutConfig: {fxFlex: 40},
        // note that because function doesn't require a displayConfig, control config doesn't have a displayConfig prop
        showField: this.firstNameIsNotBlank
      }
    ],
    {
      controlType: 'select',
      label: 'Smoking History',
      controlName: 'isSmoker',
      options: [
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'},
      ],
      placeholder: 'Have you smoked in the last six months',
    },
    // this control only shows when 'isSmoker' control has value of 'yes'
    // it uses a helper function, watchControlForValues from the ConditionalFieldsService to
    {
      controlType: 'input',
      inputType: 'number',
      label: 'Smoking Regularity',
      controlName: 'smokingRegularity',
      placeholder: 'Packs per week',
      // showField again but this time using a helper function from the conditionalFields service
      // this expects a form: FormGroup and config that descibes what control to watch
      showField: this.conditionalFields.watchControlForValues,
      // and the corresponding configuration
      // when this function get called on the generated component,
      // this configuration tells the service to watch 'isSmoker' control for a value of 'yes'.
      // More values can be watched for, just add them to the array
      displayConfig: {
        controlName: 'isSmoker',
        values: ['yes']
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

  formSubmitted(formValue: any) {
    console.log('formValue', formValue);
  }
  /**
   * example of how to build a custom function that returns an Observable that resolves a boolean
   *
   * notice lack of subcribe() call, the field component manages subcription for you
   * @param form entire form, used to grab the firstName formControl and listen for changes
   * @returns an observable that listen for changes on the firstName formControl and resolves to true when value string is longer than zero
   */
  firstNameIsNotBlank(form: FormGroup): Observable<boolean> {
    return form.get('firstName').valueChanges.pipe(
      // implementing custom rxjs operator from top of file
      isNotBlank()
    );
  }
}
