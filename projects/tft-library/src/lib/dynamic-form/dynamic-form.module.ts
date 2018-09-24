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
import { IsFormGroupConfigPipe } from './is-form-group-config.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule
  ],
  declarations: [
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    DynamicFieldDirective,
    FieldContainerComponent,
    IsFormGroupConfigPipe,
  ],
  exports: [
    DynamicFormComponent,
  ],
  entryComponents: [
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent
  ]
})
export class DynamicFormModule { }
