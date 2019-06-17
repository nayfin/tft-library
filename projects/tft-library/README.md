# TftLibrary

This is a library of components built with Angular Material Angular Flex-Layout and Angular InstantSearch.

This library is in pre-alpha. Breaking changes will occur often and documentation will be limited. As of right now I am the only contributor to the project, so it's hard to do all the things required to have a robust, stable, well-tested library. That being said Version 8.0.0 brings a lot of really nice features, especially to the DynamicForms piece. From here the focus will be on organizing the source, stabilizing the API, building robust docs and examples, and back-filling unit test before V9. Additionally, all modules will be abstracted into a separate libraries, this way end users can cherry pick the pieces they need instead of having to pull in all code and dependencies. 

Major versions will attempt to keep in line with Angular releases and we will keep past major versions available on branches in the repository


## Installation

`npm install`
## Development
watch the library
`npm run watch-lib`
In a separate terminal
serve the sandbox
`ng serve`

## Generate Documentation

We use the fantastic [compodoc](https://compodoc.app) library to generate our documentation. Simply run `npm run compodoc:lib` from the root folder to build and serve library docs locally on `localhost:8080`, or run `npm run compodoc:app` to build and serve sandbox app docs at `localhost:8081`. We are fleshing out the docs more everyday so definitions and examples should become the norm for all modules. It does have trouble watching for changes so you may need to rerun regulary if you're expecting the documentation to keep up while developing.

## Modules:

### DesignModule:
Imports and exports all `@angular/material` components and `@angular/flex-layout` to be used with components for this library. Can be used to import all components into the app code if desired.

### SearchModule:
A library of customized `angular-instantsearch` components built with `@angular/material` library.

  #### Components:
  - search-box: Filters `<ais-hits>` using text search. Defaults to `"[searchOnKeyUp]="true"`.

  - pagination: Simple pagination interface to page through `<ais-hits>`.

  - autocomplete: Emits selected item from autocompleting form input.

  - filter-select: Allows to easily refine search instance by binding to a facet (a facet can be created via algolia console). Pass `attributeName` as an input parameter, with the name of the facet on which you would like to filter. Pass `[multiple]="true"` to allow selection of multiple facet values on which to filter.

  - filter-chiplist: Similar to `<tft-filter-select>` but consists of an autocompleting chiplist, with the results of `<ais-hits>` limited to filter on values of selected chips.

  - algolia-attribution: 'Powered by Algolia' attribution to display where necessary

  Better documentation of component usage will be available in coming months, but for now examples of usage can be found in the [repository](https://github.com/nayfin/tft-library) under /src/app/examples.

### DynamicFormModule ( BETA: Regular breaking changes until stabilized. ETA: late 2019 )


A module design to generate forms when passed a JSON configuration. Created following this excellent [guide](https://toddmotto.com/angular-dynamic-components-forms) by Todd Motto, then expanded to enable recursively nested formGroups and conditionally showing form fields, and add Material Design components. More features to come

#### Breaking changes in 8.0.0

- form-select api
The form-select component allows for passing in an array of options, an observable that resolves an array of options, or a function that returns a promise that resolve to an array of options. Previously, end users would pass these through the `options`, `optionsCallback`, or `options$` parameters respectively. Now, all three methods for configuring options will be passed to the `options` parameter. This makes for a simpler api and allowed us to clean the source code significantly. Additionally, we've added an autocomplete component that utilizes the new api.

- showField api
The parameter name for the `showField` configuration object has changed from `displayConfig` to `showFieldConfig`.

#### Breaking changes in 7.1.0
The shape of the group config object had to change to enable recursively checking for subgroups inside the main form group. So, now instead of being an array of control configs the FormConfig is an object with a controlName, controlGroup, and a fields array. New usage below. Additionally, instead of emitting the form.value on submission the the dynamic-form-component emits the whole form object. This gives the end developer the power to check form validity, disabled status and anything else available on the FormGroup object.

#### Usage

In component.html
```html
<div>
  <tft-dynamic-form
    [config]="config"
    (submitted)="formSubmitted($event)">
  </tft-dynamic-form>
</div>
```

In component.ts
```javascript
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
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  // the config holds an array of configurations for the fields you want to create
  config: FormConfig = {
    controlType: ControlType.GROUP,
    controlName: 'myForm',
    fields: [
      // a basic input field in the form with the following configuration
      {
        controlType: ControlType.INPUT,
        label: 'Favorite Band',
        controlName: 'favoriteBand',
        placeholder: 'Favorite band',
      },
      // a form array of form groups
      {
        controlType: ControlType.GROUP_LIST,
        label: 'Test Form Array',
        controlName: 'testFormArray',
        itemLabelBuilder: (index: number) => {
          return `This is item number ${index}`;
        },
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
            label: 'test input number',
            inputType: 'number',
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
        controlType: ControlType.SELECT,
        label: 'Select with options passed in as observable',
        controlName: 'isSmokerObservable',
        placeholder: 'Have you smoked in the last six months',
        // pass an observable that resolves an array of options
        options: of([
          { label: 'Yes', value: 'yes' },
          { label: 'No',  value: 'no'  }
        ])
      },
      {
        controlType: ControlType.SELECT,
        label: 'Select with options passed in by a function that returns a promise that resolves to an array',
        controlName: 'isSmokerPromise',
        classes: [], // TODO: configure class to highlight correct answer
        placeholder: 'What is best',
        // pass a function that returns a promise that resolves an array of options in order to do asynchronous things, like fetch data from an endpoint
        options: () => {
          return new Promise( (resolve, reject) => {
            // make an http request here
            setTimeout( () => {
              resolve([
                {label: 'BLUE',     value: false } ,
                {label: 'DR. DOG',  value: true  },
                {label: 'GOLD',     value: false }
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
      // it uses a helper function, checkControlForValues from the ConditionalFieldsService to
      {
        controlType: ControlType.INPUT,
        inputType: 'number',
        label: 'Smoking Regularity',
        controlName: 'smokingRegularity',
        placeholder: 'Packs per week',
        // showField again but this time using a helper function from the conditionalFields service
        // this expects a form: FormGroup and config that descibes what control to watch
        showField: checkControlForValues,
        // and the corresponding configuration
        // when this function get called on the generated component,
        // this configuration tells the service to watch 'isSmoker' control for a value of 'yes'.
        // More values can be watched for, just add them to the array
        showFieldConfig: {
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
```
In component.scss if adding class to field config
```css
//!! ::ng-deep is required to pierce style encapsulation
::ng-deep.blue-background {
    background: blue !important;
}
```

#### Coming Soon To Dynamic Forms Module
- dynamic validation logic ( to correspond with dynamic display logic e.g. if control is displayed it is required, else it is not. ??? remove control from formGroup on hide ??? )
- more control types ( radios, button toggles, multi-select, etc.. until we have everything in the Angular Material Library covered )
- ~~enable passing of styles, classes, flex-layout attributes through config to form~~
- ~~handle configs with nested form groups and form arrays~~
- ~~dynamic display logic ( show hide controls based on selected values of another control e.g. select: male | female, if female show question asking if currently pregnant )~~
- ~~pass validators through config~~


### Breaking Changes from V2

  This library started as a clone of Angular Instantsearch that had been modified to implement the `@angular/material` library, which had the benefit of being highly customizable but required a lot of maintenance to stay abreast of updates to dependencies. Recently, the Angular Instanstsearch team documented [how to create custom widgets](https://community.algolia.com/angular-instantsearch/guides/customize-widgets.html), which gives us the benifits of feature release and bug fixes performed by them as well as the ability to create costom Material Design components that easily utilize InstantSearch. Unfortunately, this created some break changes, but most are easy to fix with a simple find-replace from your IDE.

  #### Changes

  - Need to `import { NgAisModule } from 'angular-instantsearch'` in modules that consume tft-search components and add to `imports` array of module
  - `<tft-filter-list></tft-filter-list>` -> `<tft-filter-select></tft-filter-select>`
  - `<tft-refinement-list></tft-refinement-list>` -> `<tft-filter-chiplist></tft-filter-chiplist>`
  - `<tft-results></tft-results>` -> `<ais-hits></ais-hits>`

  Please post an issue if you have difficulty upgrading se we can update documentation.

  The old library is available [here](https://github.com/nayfin/tft-library-2.0.7). There are no plans to maintain as the structure of the library has made it overly difficult to test, debug, and integrate into applications. Moving forward we plan on providing bug fixes and light maintenance for each major release for two major release cycles e.g. v6 will be maintained until v8 is release.

