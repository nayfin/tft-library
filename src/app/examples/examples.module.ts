import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';
import { FormsModule } from '@angular/forms';

import { TftSearchModule, DynamicFormModule } from 'tft-library';

// TODO: can I pull these from here since I am importing in router module
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AutocompleteChiplistComponent } from './autocomplete-chiplist/autocomplete-chiplist.component';
import { MyDynamicFormComponent } from './my-dynamic-form/my-dynamic-form.component';
import { UtilsComponent } from './utils/utils.component';
import { CallbackPipe } from 'projects/tft-library/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    TftSearchModule,
    DynamicFormModule.forRoot(),
    NgAisModule.forRoot(),
    FormsModule
  ],
  declarations: [
    LandingPageComponent,
    AutocompleteChiplistComponent,
    MyDynamicFormComponent,
    UtilsComponent,
    CallbackPipe
  ]
})

export class ExamplesModule { }
