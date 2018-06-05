import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';

import { TftSearchModule } from 'tft-library';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { AutocompleteChiplistComponent } from './autocomplete-chiplist/autocomplete-chiplist.component';

@NgModule({
  imports: [
    CommonModule,
    TftSearchModule,
    NgAisModule.forRoot(),
  ],
  declarations: [
    LandingPageComponent,
    AutocompleteChiplistComponent
  ]
})

export class ExamplesModule { }
