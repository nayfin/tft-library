import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModule } from '../design/public_api';
import { NgAisModule } from 'angular-instantsearch';
// search components
import { FilterSelectComponent } from './filter-select/filter-select.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AlgoliaAttributionComponent } from './algolia-attribution/algolia-attribution.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterChiplistComponent } from './filter-chiplist/filter-chiplist.component';
import { PaginationComponent } from './pagination/pagination.component';


const SEARCH_COMPONENTS = [
  FilterSelectComponent,
  SearchBoxComponent,
  AlgoliaAttributionComponent,
  AutocompleteComponent,
  FilterChiplistComponent,
  PaginationComponent,
];

@NgModule({
  imports: [
    CommonModule,
    DesignModule,
    ReactiveFormsModule,
    NgAisModule,
  ],
  declarations: SEARCH_COMPONENTS,
  exports: SEARCH_COMPONENTS
})

export class TftSearchModule { }
