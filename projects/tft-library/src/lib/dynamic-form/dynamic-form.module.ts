import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// custom modules
import { CoreModule } from '../core/public_api';
import { DesignModule } from '../design/public_api';
import { UtilitiesModule } from '../utilities/public_api';
// components
import { DynamicFormComponent } from './dynamic-form.component';
import { FieldContainerComponent } from './field-container/field-container.component';

import { FormInputComponent } from './form-input/form-input.component';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormGroupListComponent } from './form-group-list/form-group-list.component';
import { ValidationHandlingModule } from '../validation-handling/public_api';
import { FormAutocompleteComponent } from './form-autocomplete/form-autocomplete.component';
// directives
import { DynamicFieldDirective } from './dynamic-field.directive';
import { InputFieldComponent } from './material';
// providers

const FORM_FIELD_COMPONENTS = [
  FormInputComponent,
  InputFieldComponent,
  FormSelectComponent,
  FormButtonComponent,
  FormGroupComponent,
  FormGroupListComponent,
  FormAutocompleteComponent,
  FormTextareaComponent,
  FormCheckboxComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    CoreModule,
    UtilitiesModule,
    ValidationHandlingModule,
  ],
  declarations: [
    DynamicFieldDirective,
    FieldContainerComponent,
    DynamicFormComponent,
    ...FORM_FIELD_COMPONENTS
  ],
  exports: [
    DynamicFormComponent,
    ...FORM_FIELD_COMPONENTS
  ],
  entryComponents: [
    ...FORM_FIELD_COMPONENTS
  ]
})
export class DynamicFormModule { }

export {
  DynamicFormComponent,
  FormInputComponent,
  FormSelectComponent,
  FormButtonComponent,
  FormGroupComponent,
  FormGroupListComponent,
  FormAutocompleteComponent,
  FormTextareaComponent,
  FormCheckboxComponent
};

