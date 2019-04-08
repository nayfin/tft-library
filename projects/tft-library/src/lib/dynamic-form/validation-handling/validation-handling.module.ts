import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsDirective } from './control-errors.directive';

@NgModule({
  declarations: [ControlErrorsDirective],
  imports: [
    CommonModule
  ]
})
export class ValidationHandlingModule { }
