import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { ControlType, FormConfig } from 'tft-library';
import { ConditionalFieldsService } from 'tft-library';
import { Observable, of } from 'rxjs';
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
  config: FormConfig = {
    controlType: ControlType.GROUP,
    controlName: 'myForm',
    fields: [
      // configuration will create an input field in the form with the following configuration
      {
        controlType: ControlType.GROUP,
        controlName: 'nestedGroup',
        fields: [
          {
            controlType: ControlType.INPUT,
            label: 'Nested input',
            controlName: 'nestedInput',
            placeholder: 'Favorite band',
            flexLayoutConfig: {fxFlex: 40},
            // note that because function doesn't require a displayConfig, control config doesn't have a displayConfig prop
            // showField: this.firstNameIsNotBlank
          },
          {
            controlType: ControlType.INPUT,
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
            controlType: ControlType.INPUT,
            label: 'Last name',
            controlName: 'lastName',
            placeholder: 'Enter your last name',
            flexLayoutConfig: {fxFlex: 40},
            // note that because function doesn't require a displayConfig, control config doesn't have a displayConfig prop
            showField: this.firstNameIsNotBlank
          },
        ],
      },
      {
        controlType: ControlType.ARRAY,
        label: 'Form Array',
        controlName: 'formArray',
        flexLayoutConfig: {fxFlex: 40},
        itemConfig: {
          controlType: ControlType.GROUP,
          controlName: 'myForm',
          fields: [
            // configuration will create an input field in the form with the following configuration
            {
              controlType: ControlType.INPUT,
              label: 'Nested input',
              controlName: 'nestedInput',
              placeholder: 'Favorite band',
              flexLayoutConfig: {fxFlex: 100},
              // note that because function doesn't require a displayConfig, control config doesn't have a displayConfig prop
              // showField: this.firstNameIsNotBlank
            },
          ]
        },
      },
      {
        controlType: ControlType.SELECT,
        label: 'Select with options passed in as an array',
        controlName: 'isSmokerArray',
        flexLayoutConfig: {fxFlex: 40},
        placeholder: 'Have you smoked in the last six months',
        options: [
          {label: 'YES', value: 'yes'},
          {label: 'NO',  value: 'no'}
        ]
      },
      {
        controlType: ControlType.SELECT,
        label: 'Select with options passed in as observable',
        controlName: 'isSmokerObservable',
        flexLayoutConfig: {fxFlex: 40},
        placeholder: 'Have you smoked in the last six months',
        options$: of([
          {label: 'Yes', value: 'yes'},
          {label: 'No', value: 'no'}
        ])
      },
      {
        controlType: ControlType.SELECT,
        label: 'Select with options passed in by a function that returns a promise that resolves to an array',
        controlName: 'isSmokerPromis',
        flexLayoutConfig: {fxFlex: 40},
        placeholder: 'Have you smoked in the last six months',
        optionsCallback: () => {
          return new Promise( (resolve, reject) => {
            setTimeout( () => {
              resolve([
                {label: 'Yes', value: 'yes'},
                {label: 'No', value: 'no'}
              ]);

            }, 5000);
          });
        }
      },
      // this control only shows when 'isSmoker' control has value of 'yes'
      // it uses a helper function, watchControlForValues from the ConditionalFieldsService to
      {
        controlType: ControlType.INPUT,
        inputType: 'number',
        label: 'Smoking Regularity',
        controlName: 'smokingRegularity',
        placeholder: 'Packs per week',
        flexLayoutConfig: {fxFlex: 40},
        // showField again but this time using a helper function from the conditionalFields service
        // this expects a form: FormGroup and config that descibes what control to watch
        showField: this.conditionalFields.watchControlForValues,
        // and the corresponding configuration
        // when this function get called on the generated component,
        // this configuration tells the service to watch 'isSmoker' control for a value of 'yes'.
        // More values can be watched for, just add them to the array
        displayConfig: {
          controlName: 'isSmokerArray',
          values: ['yes']
        }
      },
      {
        label: 'Submit',
        controlName: 'submit',
        controlType: ControlType.BUTTON,
      },
    ]
  };

  constructor(
    private conditionalFields: ConditionalFieldsService,
  ) { }

  ngOnInit() {
  }

  formSubmitted(formValue: FormGroup) {
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
