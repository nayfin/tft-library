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