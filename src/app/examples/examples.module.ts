import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';

import { TftSearchModule, DynamicFormModule } from 'tft-library';

// TODO: can I pull these from here since I am importing in router module
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AutocompleteChiplistComponent } from './autocomplete-chiplist/autocomplete-chiplist.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    TftSearchModule,
    DynamicFormModule,
    NgAisModule.forRoot(),
  ],
  declarations: [
    LandingPageComponent,
    AutocompleteChiplistComponent,
    DynamicFormComponent
  ]
})

export class ExamplesModule { }
