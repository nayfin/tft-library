import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  ControlType,
  FormConfig,
  checkControlForValues,
  checkControlsForValues,
  computeValueFromFields,
  SelectOption,
  ReactiveOptionsConfig,
  OptionsCallback
} from 'tft-library';

/**
 * Custom rxjs operator determines if string is blank after trim
 *
 * returns false if blank else true
 */
const isNotBlank = () => map((value: string) => value ? !!value.trim().length : false);

@Component({
  selector: 'app-my-dynamic-form',
  templateUrl: './my-dynamic-form.component.html',
  styleUrls: ['./my-dynamic-form.component.scss']
})
export class MyDynamicFormComponent implements OnInit, AfterViewInit {

  // value = {
  //   // firstName: 'Nayfin',
  //   testFormArray: [
  //     {
  //       arrayGroupInput: 'Old Navy',
  //       arrayGroupNumber: 89
  //     },
  //     {
  //       arrayGroupInput: 'New Navy',
  //       arrayGroupNumber: 45
  //     }
  //   ],
  //   testNestedGroup: {
  //     nestedInput: 'POTUS',
  //     firstName: ''
  //   },
  //   isSmokerArray: 'yes',
  //   // isSmokerObservable: ['yes'],
  //   isSmokerPromise: 'blue'
  // };

  // the config holds an array of configurations for the fields you want to create
  // config: FormConfig = {
  //   controlType: ControlType.GROUP,
  //   controlName: 'myForm',
  //   errorDictionary: {
  //     'required': () => `testing`,
  //     'minlength': ({requiredLength, actualLength}) => `min: ${requiredLength}, actual: ${actualLength}`
  //   },
  //   fields: [
  //     // a basic input field in the form with the following configuration
  //     {
  //       controlType: ControlType.INPUT,
  //       label: 'First Name',
  //       controlName: 'firstName',
  //       placeholder: 'Enter your first name',
  //       classes: [],
  //       validators: [Validators.required, Validators.minLength(5)],
  //     },
  //     // another input with conditional display logic
  //     // the showField parameter takes a function that that returns an observable that resolve to a boolean
  //     // expects form of type FormGroup as its first parameter and an optional configuration object as arguments
  //     // ( form: FormGroup, config?: any ) => Observable<boolean>
  //     // you get the observable from form.get('someControlName').valueChanges
  //     // as demonstrated in this.firstnameIsNotBlank implemented below the class constructor
  //     {
  //       controlType: ControlType.INPUT,
  //       label: 'Last name',
  //       controlName: 'lastName',
  //       placeholder: 'Enter your last name',
  //       validators: [Validators.required, Validators.minLength(3)],
  //       // note that because function doesn't require a showFieldConfig, control config doesn't have a showFieldConfig prop
  //       showField: this.firstNameIsNotBlank
  //     },
  //     // a form array of form groups
  //     {
  //       controlType: ControlType.GROUP_LIST,
  //       label: 'Test Form Array',
  //       controlName: 'testFormArray',
  //       itemLabelBuilder: (index: number) => {
  //         return `This is item number ${index}`;
  //       },
  //       minListLength: 0,
  //       itemConfig: {
  //         controlType: ControlType.GROUP,
  //         controlName: 'arrayGroup',
  //         fields: [
  //           // configuration will create an input field in the form with the following configuration
  //           {
  //             controlType: ControlType.INPUT,
  //             label: 'Nested text input',
  //             controlName: 'arrayGroupInput',
  //             placeholder: 'Tell us about yourself...',

  //           },
  //           {
  //             controlType: ControlType.INPUT,
  //             label: 'Nested number input',
  //             inputType: 'number',
  //             controlName: 'arrayGroupNumber',
  //             placeholder: 'How many?',
  //           },
  //         ]
  //       },
  //     },
  //     {
  //       controlType: ControlType.GROUP,
  //       label: 'Nested Group',
  //       controlName: 'testNestedGroup',
  //       fields: [
  //         {
  //           controlType: ControlType.INPUT,
  //           label: 'Nested input',
  //           controlName: 'nestedInput',
  //           placeholder: 'Favorite band',

  //         },
  //         {
  //           controlType: ControlType.INPUT,
  //           label: 'First Name',
  //           controlName: 'firstName',
  //           placeholder: 'Enter your first name',
  //           classes: [],
  //           validators: [Validators.required],
  //         },
  //         // another input with conditional display logic
  //         // the showField parameter takes a function that that returns an observable that resolve to a boolean
  //         // expects form of type FormGroup as its first parameter and an optional configuration object as arguments
  //         // ( form: FormGroup, config?: any ) => Observable<boolean>
  //         // you get the observable from form.get('someControlName').valueChanges
  //         // as demonstrated in this.firstnameIsNotBlank implemented below the class constructor
  //         {
  //           controlType: ControlType.INPUT,
  //           label: 'Last name',
  //           controlName: 'lastName',
  //           placeholder: 'Enter your last name',
  //           // note that because function doesn't require a showFieldConfig, control config doesn't have a showFieldConfig prop
  //           showField: this.firstNameIsNotBlank
  //         },
  //       ],
  //     },
  //     {
  //       controlType: ControlType.AUTOCOMPLETE,
  //       label: 'Select with options passed in as observable',
  //       controlName: 'isSmokerObservable',
  //       placeholder: 'Have you smoked in the last six months',
  //       multiple: true,
  //       // use the options$ parameter to easily tie to app state with an Obserbable
  //       options: () => {
  //         return new Promise( (resolve, reject) => {
  //           // make an http request here
  //           setTimeout( () => {
  //             resolve([
  //               {label: 'BLUE',     value: 'blue' } ,
  //               {label: 'DR. DOG',  value: 'dr. dog'  },
  //               {label: 'GOLD',     value: 'gold' }
  //             ]);
  //           }, 5000);
  //         });
  //       }
  //     },
  //     {
  //       controlType: ControlType.SELECT,
  //       label: 'Select with options passed in by a function that returns a promise that resolves to an array',
  //       controlName: 'isSmokerPromise',
  //       classes: [], // TODO: configure class to highlight correct answer
  //       placeholder: 'What is best',
  //       // pass a function that resolves a promise in order to do asynchronous things, like fetch data from an endpoint
  //       options: () => {
  //         return new Promise( (resolve, reject) => {
  //           // make an http request here
  //           setTimeout( () => {
  //             resolve([
  //               {label: 'BLUE',     value: 'blue' } ,
  //               {label: 'DR. DOG',  value: 'dr. dog'},
  //               {label: 'GOLD',     value: 'gold' }
  //             ]);
  //           }, 5000);
  //         });
  //       }
  //     },
  //     {
  //       controlType: ControlType.SELECT,
  //       label: 'Select with options passed in as an array',
  //       controlName: 'isSmokerArray',
  //       placeholder: 'Have you smoked in the last six months',
  //       // or just pass in a simple array of options
  //       options: [
  //         {label: 'YES', value: 'yes'},
  //         {label: 'NO',  value: 'no'}
  //       ]
  //     },

  //     // this control only shows when 'isSmoker' control has value of 'yes'
  //     // it uses a helper function, checkControlForValues from the ConditionalFieldsService to
  //     {
  //       controlType: ControlType.INPUT,
  //       inputType: 'number',
  //       label: 'Smoking Regularity',
  //       controlName: 'smokingRegularity',
  //       placeholder: 'Packs per week',
  //       // showField again but this time using a helper function from the conditionalFields service
  //       // this expects a form: FormGroup and config that descibes what control to watch
  //       showField: this.conditionalFields.CheckControlForValues,
  //       // and the corresponding configuration
  //       // when this function gets called on the generated component,
  //       // this configuration tells the service to watch 'isSmoker' control for a value of 'yes'.
  //       // More values can be watched for, just add them to the array
  //       showFieldConfig: {
  //         controlName: 'isSmokerArray',
  //         values: ['yes']
  //       }
  //     },
  //     {
  //       label: 'Submit',
  //       controlName: 'submit',
  //       controlType: ControlType.BUTTON,
  //     },
  //   ]
  // };
  form: FormGroup = new FormGroup({});

  value = {
    factorA: 0,
    factorB: 4,
    factorC: 3,
  };
  config: FormConfig = {
    controlType: ControlType.GROUP,
    controlName: 'myForm',
    fields: [
      // a basic input field in the form with the following configuration
      {
        controlType: ControlType.TEXTAREA,
        label: 'Description',
        controlName: 'description',
        placeholder: 'Enter a description',
        rows: 3,
        classes: [],
        validators: [Validators.required],
      },
      {
        controlType: ControlType.AUTOCOMPLETE,
        label: 'Testing Then',
        controlName: 'isSmokerObservable',
        placeholder: 'Have you smoked in the last six months',
        multiple: true,
        // use the options$ parameter to easily tie to app state with an Obserbable
        options: (): Promise<SelectOption[]> => {
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
        controlType: ControlType.GROUP,
        controlName: 'whatProgrammingLanguages',
        label: 'What programming languages do you know?',
        fields: [
          {
            controlType: ControlType.CHECKBOX,
            text: 'JavaScript',
            controlName: 'javaScript',
            labelPosition: 'after',
            inline: true,
            classes: [],
            validators: [Validators.required],
          },
          {
            controlType: ControlType.CHECKBOX,
            text: 'Java',
            controlName: 'java',
            labelPosition: 'after',
            inline: true,
            classes: [],
            validators: [Validators.required],
          },
          {
            controlType: ControlType.CHECKBOX,
            text: 'Go',
            controlName: 'goLang',
            labelPosition: 'after',
            inline: true,
            classes: [],
            validators: [Validators.required],
          },
          {
            controlType: ControlType.CHECKBOX,
            text: 'Python',
            controlName: 'python',
            labelPosition: 'after',
            inline: true,
            classes: [],
            validators: [Validators.required],
          },
        ]
      },
      {
        controlType: ControlType.GROUP,
        controlName: 'whatDoYouThink',
        label: 'What do you think about these block checkboxes?',
        fields: [
          {
            controlType: ControlType.CHECKBOX,
            text: 'Block checkboxes are awesome',
            controlName: 'blockCheckboxesAwesome',
            labelPosition: 'before',
            inline: false,
            classes: [],
            validators: [Validators.required],
          },
          {
            controlType: ControlType.CHECKBOX,
            text: 'Inline block checkboxes are awesome',
            controlName: 'inlineBlockCheckboxesAwesome',
            labelPosition: 'before',
            classes: [],
            validators: [Validators.required],
          }
        ]
      },
      {
        controlType: ControlType.GROUP,
        controlName: 'whatDoYouThinkCheckboxesBefore',
        label: 'What do you think about checkboxes before the label?',
        fields: [
          {
            controlType: ControlType.CHECKBOX,
            text: 'Checkboxes before label, always.',
            controlName: 'checkboxesBefore',
            labelPosition: 'after',
            inline: false,
            classes: [],
            validators: [Validators.required],
          },
          {
            controlType: ControlType.CHECKBOX,
            text: 'Checkboxes after label are good sometimes too',
            controlName: 'inlineBlockCheckboxesAwesome',
            labelPosition: 'after',
            classes: [],
            validators: [Validators.required],
          }
        ]
      },
      {
        controlType: ControlType.SELECT,
        label: 'What is Best',
        controlName: 'showFieldControllerA',
        placeholder: 'What is Best',
        options: (): Promise<any> => {
          return new Promise((resolve, reject) => {
            // make an http request here
            setTimeout(() => {
              resolve([
                { label: 'BLUE', value: 'blue' },
                { label: 'DR. DOG', value: 'dr. dog' },
                { label: 'GOLD', value: 'gold' }
              ]);
            }, 200);
          });
        },
        validators: [Validators.required, Validators.minLength(5)],
      },
      {
        controlType: ControlType.SELECT,
        label: 'What is Best',
        controlName: 'showFieldControllerB',
        placeholder: 'What is Best',
        reactiveOptionsConfig:{ controlNamesToWatch: ['showFieldControllerA']},
        options: (group, config: ReactiveOptionsConfig) => {
          const controlNameToWatch = config.controlNamesToWatch[0];
          return group.get(controlNameToWatch).valueChanges.pipe(
            switchMap( value => {
              switch (value) {
                case 'gold':                 
                  return of([ 
                    { label: 'gold 1', value: 'g1'},
                    { label: 'gold 2', value: 'g2'}
                  ])
              
                default:
                  return of([
                    { label: 'default 1', value: 'd1'},
                    { label: 'default 2', value: 'd2'},
                  ])
              }
            })
          )
        },
        validators: [Validators.required, Validators.minLength(5)],
      },
      {
        controlType: ControlType.SELECT,
        label: 'Can you see me',
        controlName: 'conditionalField',
        placeholder: 'Can you see me',
        showField: checkControlsForValues,
        showFieldConfig:  {
          watchConfigs: [
            { controlName: 'showFieldControllerA', values: ['gold'] },
            { controlName: 'showFieldControllerB', values: ['gold'] }
          ],
          evaluate: (bools: boolean[]) => {
            return bools[0] && !bools[1]
          }
        },
      },
      {
        controlType: ControlType.GROUP,
        label: 'Nested Group',
        controlName: 'testNestedGroup',
        showField: checkControlForValues,
        showFieldConfig: {
          controlName: 'showFieldControllerA',
          values: ['blue']
        },
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
            // note that because function doesn't require a showFieldConfig, control config doesn't have a showFieldConfig prop
            showField: this.firstNameIsNotBlank
          },
        ],
      },
      {
        controlType: ControlType.INPUT,
        inputType: 'number',
        label: 'factor a',
        controlName: 'factorA',
        placeholder: 'Factor A',
      },
      {
        controlType: ControlType.INPUT,
        inputType: 'number',
        label: 'factor B',
        controlName: 'factorB',
        placeholder: 'Factor B',
      },
      {
        controlType: ControlType.INPUT,
        inputType: 'number',
        label: 'factor C',
        controlName: 'factorC',
        placeholder: 'Factor C',
      },
      {
        controlType: ControlType.INPUT,
        inputType: 'number',
        label: 'Computed Value',
        controlName: 'computedValue',
        placeholder: 'Computed Total',
        computeField: computeValueFromFields,
        // and the corresponding configuration
        // when this function gets called on the generated component,
        // this configuration tells the service to watch 'isSmoker' control for a value of 'yes'.
        // More values can be watched for, just add them to the array
        computeFieldConfig: {
          // we pass in the names of the controls who's values we want to watch and transform
          // note: for now we can only hook up to sibling controls of this control. 
          // I am working on an API to give the consuming component access to the entire form group
          controlNamesToWatch: ['factorA', 'factorB', 'factorC'],
          // here we are expecting three numeric values because we are watching three input fields of input type number
          computeCallback: (values: number[]) => {
            // we make sure we're dealing with numbers
            const numericValues = values.map( value => +value);
            // and we will return the value of factorA times the value of factorB and added to the value of factorC
            // and set the value for field this field
            return numericValues[0] * numericValues[1] + numericValues[2]
          },
        }
      },
      {
        label: 'Submit',
        controlName: 'submit',
        controlType: ControlType.BUTTON,
      },
    ]
  };

  afterInitFieldConfig = {
    controlType: ControlType.INPUT,
    inputType: 'number',
    label: 'afterInitFieldConfig',
    controlName: 'afterInitFieldConfig',
    placeholder: 'afterInitFieldConfig',
  };


  constructor(
    // private conditionalFields: ConditionalFieldsService,
  ) { }

  ngOnInit() {
    // console.log('onInit', this.dynamicForm.form);
  }

  ngAfterViewInit(): void {
    // console.log('afterViewInit', this.dynamicForm.form);
  }

  formSubmitted(formValue: FormGroup) {
    console.log('formValue', formValue);
  }
  /**
   * example of how to build a custom function that returns an Observable that resolves a boolean
   *
   * notice lack of subscribe() call, the field-container.component manages the subscription for you
   * @param form entire form, used to grab the firstName formControl and listen for changes
   * @returns an observable that listen for changes on the firstName formControl and resolves to true when value string is longer than zero
   */
  firstNameIsNotBlank(form: FormGroup): Observable<boolean> {
    return form.get('firstName').valueChanges.pipe(
      // implementing custom rxjs operator from top of file
      // it simply checks the firstName control return true if the field isn't blank false if it is
      // that's all the showField control needs is a function that returns an observable which resolves a boolean 
      isNotBlank()
    );
  }
}
