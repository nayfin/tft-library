# TftLibrary

This is a library of components built with Angular Material Angular Flex-Layout and Angular InstantSearch.

This library is in pre-alpha. Breaking changes will accur often and documentation will be limited.

Major versions will attempt to keep in line with Angular releases and we will keep past major versions available on branches in the repository

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

In component.ts
```javascript
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
      validators: [Validators.required]
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
```

#### Coming Soon To Dynamic Forms Module
- abstract shared field logic to parent class or service
- handle configs with nested form groups and form arrays ( should form config be an object instead of array? )
- enable passing of styles, classes, flex-layout attributes through config to form
- ~~dynamic display logic ( show hide controls based on selected values of another control e.g. select: male | female, if female show question asking if currently pregnant )~~
- ~~pass validators through config~~
- dynamic validation logic ( to correspond with dynamic display logic e.g. if control is displayed it is required, else it is not. ??? remove control from formGroup on hide ??? )
- more control types ( radios, button toggles, multi-select, etc.. until we have everything in the Angular Material Library covered )


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