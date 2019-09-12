import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// custom modules
import { CoreModule } from '../core/public_api';
import { DesignModule } from '../design/public_api';
import { UtilitiesModule } from '../utilities/public_api';
import { ValidationHandlingModule } from '../validation-handling/public_api';
// components
import { DynamicFormComponent } from './dynamic-form.component';
import { FieldContainerComponent } from './field-container/field-container.component';
import { InputFieldComponent } from './material/input-field/input-field.component';
import { SelectFieldComponent } from './material/select-field/select-field.component';
import { AutocompleteFieldComponent } from './material/autocomplete-field/autocomplete-field.component';
import { CheckboxFieldComponent } from './material/checkbox-field/checkbox-field.component';
import { TextareaFieldComponent } from './material/textarea-field/textarea-field.component';
import { RaisedButtonComponent } from './material/raised-button/raised-button.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormGroupListComponent } from './form-group-list/form-group-list.component';
// directives
import { DynamicFieldDirective } from './dynamic-field.directive';

const FORM_FIELD_COMPONENTS = [
  InputFieldComponent,
  SelectFieldComponent,
  AutocompleteFieldComponent,
  CheckboxFieldComponent,
  TextareaFieldComponent,
  RaisedButtonComponent,
  FormGroupComponent,
  FormGroupListComponent
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
    ...FORM_FIELD_COMPONENTS,
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
  InputFieldComponent,
  SelectFieldComponent,
  AutocompleteFieldComponent,
  CheckboxFieldComponent,
  TextareaFieldComponent,
  RaisedButtonComponent,
  FormGroupComponent,
  FormGroupListComponent,
};

