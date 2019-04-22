import { Directive, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay, tap, map } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'form'
})
export class FormSubmitDirective {

  @Input() errorDictionary: any;

  submit$ = fromEvent(this.element, 'submit').pipe(
    // this.toggleSubmited(),
    shareReplay(1),
    // we need to label the submit event for the control errors directive
    // it uses this to determine if errors should be thrown in an untouched form
    map(() => 'submitted')
  );

  constructor(private host: ElementRef<HTMLFormElement>) { }

  get element() {
    return this.host.nativeElement;
  }

  // toggleSubmited() {
  //   return tap(() => {
  //     if (this.element.classList.contains('submitted') === false) {
  //       this.element.classList.add('submitted');
  //     }
  //   });
  // }
}
