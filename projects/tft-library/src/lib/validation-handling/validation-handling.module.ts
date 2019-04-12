import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsDirective } from './control-errors.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { FormSubmitDirective } from './form-submit.directive';
import { DesignModule } from '../design/public_api';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@NgModule({
  declarations: [
    ControlErrorsDirective,
    ControlErrorComponent,
    FormSubmitDirective,
    ControlErrorContainerDirective,
  ],
  imports: [
    CommonModule,
    DesignModule
  ],
  exports: [
    ControlErrorsDirective,
    ControlErrorComponent,
    FormSubmitDirective,
    ControlErrorContainerDirective,
  ],
  entryComponents: [
    ControlErrorComponent
  ]
})
export class ValidationHandlingModule { }
