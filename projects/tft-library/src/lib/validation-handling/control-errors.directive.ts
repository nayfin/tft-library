import {
  Directive, Self, OnInit, OnDestroy, Optional, ComponentRef,
  ComponentFactoryResolver, ViewContainerRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, EMPTY, Observable, merge, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { defaultErrors, ErrorDictionary } from './form-errors';
import { ControlErrorsFormDirective } from './control-errors-form.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@Directive({
  // we want to hook into all formControls so we use these selectors
  // tslint:disable-next-line: directive-selector
  selector: '[formControl], [formControlName]',
})
export class ControlErrorsDirective implements OnInit, OnDestroy {

  ref: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  submit$: Observable<{}>;
  blur$ = new Subject();
  subs: Subscription[] = [];
  errors: ErrorDictionary;
  // we need to make our own Observable of the blur event as it's not provided by the formControl
  @HostListener('blur')
  handleBlur() {
    this.blur$.next();
  }

  constructor(
    @Self() private control: NgControl,
    @Optional() private form: ControlErrorsFormDirective,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) {
    this.submit$ = form ? form.submit$ : EMPTY;
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.errors = form && form.errorDictionary
      ? { ...defaultErrors, ...form.errorDictionary}
      : defaultErrors;
  }

  ngOnInit() {
    // build array of subscriptions
    this.subs.push(
      this.getInteractionHandler().subscribe(),
    );
  }

  ngOnDestroy() {
    // close subscriptions
    this.subs.forEach(sub => sub.unsubscribe);
  }

  // merges ui events into a single stream and handles events displaying errors when appropriate
  getInteractionHandler() {
    return merge(
      this.submit$,
      this.blur$,
      this.control.valueChanges
    ).pipe(
      tap( event => {
        // prevents displaying error messages before user interaction unless submitting
        if (this.control.touched || event === 'submitted') {
          const errorMessage = this.getErrorMessage();
          this.setError(errorMessage);
        }
      })
    );
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }
    this.ref.instance.text = text;
  }

  getErrorMessage() {
      const controlErrors = this.control.errors;
      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.errors[firstKey] || this.errors['default'];
        const text = getError(controlErrors[firstKey]);
        return text;
      } else {
        return null;
      }
  }
}

