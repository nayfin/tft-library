# TftLibrary

This is a library of components built with Angular Material Angular Flex-Layout and Angular InstantSearch.

This library is in pre-alpha. Breaking changes will accur often and documentation will be limited.

Major versions will attempt to keep in line with Angular releases and we will keep past major versions available on branches in the repository

## Generate Documentation

We use the fantastic [compodoc](https://compodoc.app) library to generate our documentation. Simply run `npm run compodoc:lib` from the root folder to build and serve library docs locally on `localhost:8080`, or run `npm run compodoc:app` to build and serve sandbox app docs at `localhost:8081`. We are fleshing out the docs more everyday so definitions and examples should become the norm for all modules. It does have trouble watching for changes so you may need to rerun regulary if you're expecting the documentation to keep up while developing.

## Modules:

### DesignModule:
Imports and exports all `@angular/material` componenst and `@angular/flex-layout` to be used with components for this library. Can be used to import all components into the app code if desired.

### SearchModule:
A library of customized `angular-instantsearch` components built with `@angular/material` library.

  #### Components:
  - search-box: Filters `<ais-hits>` using text search. Defaults to `"[searchOnKeyUp]="true"`.

  - pagination: Simple pagination interface to page through `<ais-hits>`.

  - autocomplete: Emits selected item from autocompleting form input.

  - filter-select: Allows to easily refine search instance by binding to a facet (a facet can be created via algolia console). Pass `attributeName` as an input parameter, with the name of the facet on which you would like to filter. Pass `[multiple]="true"` to allow selection of multiple facet values on which to filter.

  - filter-chiplist: Similar to `<tft-filter-select>` but consists of an autocompleting chiplist, with the results of `<ais-hits>` limited to filter on values of selected chips.

  - algolia-attribution: 'Powered by Algolia' attribution to display where necesarry

  Better documentation of component usage will be available in coming months, but for now examples of usage can be found in the [repository](https://github.com/nayfin/tft-library) under /src/app/examples.

### DynamicFormModule ( BETA: Regular breaking changes until stabilized. ETA: late October )

A module design to generate forms when passed a JSON configuration. Created following this excellent [guide](https://toddmotto.com/angular-dynamic-components-forms) by Todd Motto. Some parameter names have been changed from his guide to allow for future features, so this won't work as a drop in imlementation to following the guide. Currently, this is only a very basic implementation, but we want to greatly expand the capabilities of this module.

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
import { ConditionalFieldsService } from 'projects/tft-library/src/lib/dynamic-form/conditional-fields.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { SelectFieldConfig } from 'projects/tft-library/src/lib/dynamic-form/form-select/select-field-config';
// import { InputFieldConfig } from 'projects/tft-library/src/lib/dynamic-form/form-input/input-field-config';
import { AnyFieldConfig, FormConfig } from 'projects/tft-library/src/lib/dynamic-form/dynamic-field-config';

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
  // TODO: was types as AnyControlConfig[] but recursive implementation broke the type. Figure out way to strongly type this recursively
  config: any[] = [
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
   * example of how to pass a custom function that returns an Observable that resolves a boolean
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
- abstract shared field logic to parent class somehow
- should form config be an object instead of array?
- enable passing of styles, classes, flex-layout attributes through config to form
- dynamic validation logic ( to correspond with dynamic display logic e.g. if control is displayed it is required, else it is not. ??? remove control from formGroup on hide ??? )
- more control types ( radios, button toggles, multi-select, etc.. until we have everything in the Angular Material Library covered )
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

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7