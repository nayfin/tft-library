import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// custom modules
import { CoreModule } from '../core/public_api';
import { DesignModule } from '../design/public_api';
// components
import { DynamicFormComponent } from './dynamic-form.component';
import { FieldContainerComponent } from './field-container/field-container.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormButtonComponent } from './form-button/form-button.component';
// directives
import { DynamicFieldDirective } from './dynamic-field.directive';
// providers
import { ConditionalFieldsService } from './conditional-fields.service';
import { IsGroupConfigPipe } from './is-group-config.pipe';
import { FormGroupComponent } from './form-group/form-group.component';

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
    IsGroupConfigPipe,
    FormArrayComponent,
    FormGroupComponent,
  ],
  exports: [
    DynamicFormComponent,
    FormGroupComponent,
    FormArrayComponent,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
  ],
  entryComponents: [
    FormGroupComponent,
    FormArrayComponent,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
  ]
})
export class DynamicFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DynamicFormModule,
      providers: [
        ConditionalFieldsService
      ]
    };
  }
 }
