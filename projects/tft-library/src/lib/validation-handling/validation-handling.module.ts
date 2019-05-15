import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsDirective } from './control-errors.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ControlErrorsFormDirective } from './control-errors-form.directive';
import { DesignModule } from '../design/public_api';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@NgModule({
  declarations: [
    ControlErrorsDirective,
    ControlErrorComponent,
    ControlErrorsFormDirective,
    ControlErrorContainerDirective,
  ],
  imports: [
    CommonModule,
    DesignModule
  ],
  exports: [
    ControlErrorsDirective,
    ControlErrorComponent,
    ControlErrorsFormDirective,
    ControlErrorContainerDirective,
  ],
  entryComponents: [
    ControlErrorComponent
  ]
})
export class ValidationHandlingModule { }
