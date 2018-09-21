import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { ConditionalFieldsService } from 'projects/tft-library/src/lib/dynamic-form/conditional-fields.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { SelectFieldConfig } from 'projects/tft-library/src/lib/dynamic-form/form-select/select-field-config';
// import { InputFieldConfig } from 'projects/tft-library/src/lib/dynamic-form/form-input/input-field-config';
import { AnyFieldConfig } from 'projects/tft-library/src/lib/dynamic-form/dynamic-field-config';

/**
 * Custom rxjs operator determines if string is blank after trim
 *
 * returns false if blank else true
 */
const isNotBlank = () => map( (value: string) => !!value.trim().length );

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  // the config holds an array of configurations for the fields you want to create
  config: AnyFieldConfig[] = [
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
    // this control only shows when 'gender' control has value of 'female'
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
      // this configuration tells the service to watch 'gender' control for a value of 'female'
      displayConfig: {
        controlName: 'isSmoker',
        values: ['yes']
      }
    },
    // {
    //   controlType: 'input',
    //   label: 'Pregnancy Duration',
    //   controlName: 'pregnancyDuration',
    //   placeholder: 'What trimester',
    //   showField: this.conditionalFields.watchControlForValues,
    //   displayConfig: {
    //     controlName: 'pregnancy',
    //     values: ['y']
    //   }
    // },
    // {
    //   controlType: 'input',
    //   label: 'Comments',
    //   controlName: 'comments',
    //   placeholder: 'Comment here',
    //   showField: this.conditionalFields.watchControlForValues,
    //   displayConfig: {
    //     controlName: 'pregnancyDuration',
    //     values: ['first']
    //   }
    // },
    {
      label: 'Submit',
      controlName: 'submit',
      controlType: 'button',
    },
  ];

  someObject = {
    keyOne: 'Hello',
    keyTwo: 'Operator'
  };
  constructor(
    private conditionalFields: ConditionalFieldsService,
  ) { }

  ngOnInit() {
  }

  formSubmitted(formValue: any) {
    console.log('formValue', formValue);
  }
  /**
   * example of how to pass a custom function that returns an Observable that resolves a boolean
   *
   * notice lack of subcribe() call, the field component manages subcription for you
   * @param form entire form, used to grab the firstName formControl and listen for changes
   * @returns an observable that listen for changes on the firstName formControl and resolves to true when value string is longer than zero
   */
  firstNameIsNotBlank(form: FormGroup): Observable<boolean> {
    return form.get('firstName').valueChanges.pipe(
      isNotBlank()
    );
  }

  isNotBlank() {
    return map( (value: string) => !!value.trim().length );
  }
}
