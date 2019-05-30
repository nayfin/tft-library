import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { ControlType, FormConfig } from 'tft-library';
import { ConditionalFieldsService } from 'tft-library';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Custom rxjs operator determines if string is blank after trim
 *
 * returns false if blank else true
 */
const isNotBlank = () => map( (value: string) => value ? !!value.trim().length : false );

@Component({
  selector: 'app-my-dynamic-form',
  templateUrl: './my-dynamic-form.component.html',
  styleUrls: ['./my-dynamic-form.component.scss']
})
export class MyDynamicFormComponent implements OnInit {

  value = {
    // firstName: 'Nayfin',
    testFormArray: [
      {
        arrayGroupInput: 'Old Navy',
        arrayGroupNumber: 89
      },
      {
        arrayGroupInput: 'New Navy',
        arrayGroupNumber: 45
      }
    ],
    testNestedGroup: {
      nestedInput: 'POTUS',
      firstName: ''
    },
    isSmokerArray: 'yes',
    // isSmokerObservable: ['yes'],
    isSmokerPromise: 'blue'
  };

  // the config holds an array of configurations for the fields you want to create
  config: FormConfig = {
    controlType: ControlType.GROUP,
    controlName: 'myForm',
    errorDictionary: {
      'required': () => `testing`,
      'minlength': ({requiredLength, actualLength}) => `min: ${requiredLength}, actual: ${actualLength}`
    },
    fields: [
      // a basic input field in the form with the following configuration
      {
        controlType: ControlType.INPUT,
        label: 'First Name',
        controlName: 'firstName',
        placeholder: 'Enter your first name',
        classes: [],
        validators: [Validators.required, Validators.minLength(5)],
      },
      // another input with conditional display logic
      // the showField parameter takes a function that that returns an observable that resolve to a boolean
      // expects form of type FormGroup as its first parameter and an optional configuration object as arguments
      // ( form: FormGroup, config?: any ) => Observable<boolean>
      // you get the observable from form.get('someControlName').valueChanges
      // as demonstrated in this.firstnameIsNotBlank implemented below the class constructor
      {
        controlType: ControlType.INPUT,
        label: 'Last name',
        controlName: 'lastName',
        placeholder: 'Enter your last name',
        validators: [Validators.required, Validators.minLength(3)],
        // note that because function doesn't require a displayConfig, control config doesn't have a displayConfig prop
        showField: this.firstNameIsNotBlank
      },
      // a form array of form groups
      {
        controlType: ControlType.GROUP_LIST,
        label: 'Test Form Array',
        controlName: 'testFormArray',
        itemLabelBuilder: (index: number) => {
          return `This is item number ${index}`;
        },
        minListLength: 0,
        itemConfig: {
          controlType: ControlType.GROUP,
          controlName: 'arrayGroup',
          fields: [
            // configuration will create an input field in the form with the following configuration
            {
              controlType: ControlType.INPUT,
              label: 'Nested text input',
              controlName: 'arrayGroupInput',
              placeholder: 'Tell us about yourself...',

            },
            {
              controlType: ControlType.INPUT,
              label: 'Nested number input',
              inputType: 'number',
              controlName: 'arrayGroupNumber',
              placeholder: 'How many?',
            },
          ]
        },
      },
      {
        controlType: ControlType.GROUP,
        label: 'Nested Group',
        controlName: 'testNestedGroup',
        fields: [
          {
            controlType: ControlType.INPUT,
            label: 'Nested input',
            controlName: 'nestedInput',
            placeholder: 'Favorite band',

          },
          {
            controlType: ControlType.INPUT,
            label: 'First Name',
            controlName: 'firstName',
            placeholder: 'Enter your first name',
            classes: [],
            validators: [Validators.required],
          },
          // another input with conditional display logic
          // the showField parameter takes a function that that returns an observable that resolve to a boolean
          // expects form of type FormGroup as its first parameter and an optional configuration object as arguments
          // ( form: FormGroup, config?: any ) => Observable<boolean>
          // you get the observable from form.get('someControlName').valueChanges
          // as demonstrated in this.firstnameIsNotBlank implemented below the class constructor
          {
            controlType: ControlType.INPUT,
            label: 'Last name',
            controlName: 'lastName',
            placeholder: 'Enter your last name',
            // note that because function doesn't require a displayConfig, control config doesn't have a displayConfig prop
            showField: this.firstNameIsNotBlank
          },
        ],
      },
      {
        controlType: ControlType.AUTOCOMPLETE,
        label: 'Select with options passed in as observable',
        controlName: 'isSmokerObservable',
        placeholder: 'Have you smoked in the last six months',
        multiple: true,
        // use the options$ parameter to easily tie to app state with an Obserbable
        options: () => {
          return new Promise( (resolve, reject) => {
            // make an http request here
            setTimeout( () => {
              resolve([
                {label: 'BLUE',     value: 'blue' } ,
                {label: 'DR. DOG',  value: 'dr. dog'  },
                {label: 'GOLD',     value: 'gold' }
              ]);
            }, 5000);
          });
        }
      },
      {
        controlType: ControlType.SELECT,
        label: 'Select with options passed in by a function that returns a promise that resolves to an array',
        controlName: 'isSmokerPromise',
        classes: [], // TODO: configure class to highlight correct answer
        placeholder: 'What is best',
        // pass a function that resolves a promise in order to do asynchronous things, like fetch data from an endpoint
        options: () => {
          return new Promise( (resolve, reject) => {
            // make an http request here
            setTimeout( () => {
              resolve([
                {label: 'BLUE',     value: 'blue' } ,
                {label: 'DR. DOG',  value: 'dr. dog'},
                {label: 'GOLD',     value: 'gold' }
              ]);
            }, 5000);
          });
        }
      },
      {
        controlType: ControlType.SELECT,
        label: 'Select with options passed in as an array',
        controlName: 'isSmokerArray',
        placeholder: 'Have you smoked in the last six months',
        // or just pass in a simple array of options
        options: [
          {label: 'YES', value: 'yes'},
          {label: 'NO',  value: 'no'}
        ]
      },

      // this control only shows when 'isSmoker' control has value of 'yes'
      // it uses a helper function, watchControlForValues from the ConditionalFieldsService to
      {
        controlType: ControlType.INPUT,
        inputType: 'number',
        label: 'Smoking Regularity',
        controlName: 'smokingRegularity',
        placeholder: 'Packs per week',
        // showField again but this time using a helper function from the conditionalFields service
        // this expects a form: FormGroup and config that descibes what control to watch
        showField: this.conditionalFields.watchControlForValues,
        // and the corresponding configuration
        // when this function gets called on the generated component,
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
