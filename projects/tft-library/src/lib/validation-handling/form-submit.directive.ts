import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'form'
})
export class FormSubmitDirective {
  submit$ = fromEvent(this.element, 'submit').pipe(
    this.toggleSubmited(),
    shareReplay(1)
  );

  constructor(private host: ElementRef<HTMLFormElement>) { }

  get element() {
    return this.host.nativeElement;
  }

  toggleSubmited() {
    return tap(() => {
      if (this.element.classList.contains('submitted') === false) {
        this.element.classList.add('submitted');
      }
    });
  }
}
