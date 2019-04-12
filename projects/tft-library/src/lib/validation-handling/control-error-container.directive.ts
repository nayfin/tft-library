import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[controlErrorContainer], [formGroup]'
})
export class ControlErrorContainerDirective {

  constructor(public vcr: ViewContainerRef) { }

}
