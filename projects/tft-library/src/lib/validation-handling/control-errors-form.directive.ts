import { Directive, Input, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';


@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'form'
})
// TODO: rename this directive as it does more than just capture button submits
export class ControlErrorsFormDirective {

  @Input() errorDictionary: any;

  submit$ = fromEvent(this.element, 'submit').pipe(
    shareReplay(1),
    // we need to label the submit event for the control errors directive
    // it uses this to determine if errors should be thrown in an untouched form
    map(() => 'submitted'),
  );

  constructor(private host: ElementRef<HTMLFormElement>) { }

  get element() {
    return this.host.nativeElement;
  }

}
