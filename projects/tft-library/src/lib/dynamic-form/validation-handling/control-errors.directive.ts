import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
// we want to hook into all formControls so we use that as a selector
// tslint:disable-next-line: directive-selector
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective {

  constructor(private controlDir: NgControl) {}

}
