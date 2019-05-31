import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';
import { FormsModule } from '@angular/forms';

import { TftSearchModule, DynamicFormModule, PipesModule, FileUploadModule, DesignModule, ValidationHandlingModule } from 'tft-library';

// TODO: can I pull these from here since I am importing in router module
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AutocompleteChiplistComponent } from './autocomplete-chiplist/autocomplete-chiplist.component';
import { MyDynamicFormComponent } from './my-dynamic-form/my-dynamic-form.component';
import { UtilsComponent } from './utils/utils.component';
import { MyFileUploadComponent } from './my-file-upload/my-file-upload.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TftSearchModule,
    DynamicFormModule,
    ValidationHandlingModule,
    NgAisModule.forRoot(),
    FormsModule,
    PipesModule,
    DesignModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  declarations: [
    LandingPageComponent,
    AutocompleteChiplistComponent,
    MyDynamicFormComponent,
    MyFileUploadComponent,
    UtilsComponent,
  ]
})

export class ExamplesModule { }
