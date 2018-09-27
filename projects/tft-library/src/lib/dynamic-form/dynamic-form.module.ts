import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// custom modules
import { DynamicFormComponent } from './dynamic-form.component';
import { DesignModule } from '../design/public_api';
// components
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { FieldContainerComponent } from './field-container/field-container.component';
import { CoreModule } from '../core/public_api';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    CoreModule,
  ],
  declarations: [
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    DynamicFieldDirective,
    FieldContainerComponent,
  ],
  exports: [
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
  ],
  entryComponents: [
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
  ]
})
export class DynamicFormModule { }
