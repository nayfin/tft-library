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


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3