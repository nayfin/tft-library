import {
  Directive, Self, OnInit, OnDestroy, Optional, Host,
  ComponentRef, ComponentFactoryResolver, ViewContainerRef, Inject, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, EMPTY, Observable, merge, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FORM_ERRORS } from './form-errors';
import { FormSubmitDirective } from './form-submit.directive';
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

  // we need to make our own Observable of the blur event as it's not provided by the formControl
  @HostListener('blur')
  handleBlur() {
    this.blur$.next();
  }

  constructor(
    @Self() private control: NgControl,
    @Optional() @Host() private form: FormSubmitDirective,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(FORM_ERRORS) private errors,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }

  ngOnInit() {
    this.subs.push(
      merge(
        this.submit$,
        this.blur$,
        this.control.valueChanges
      ).pipe(
        this.handleErrors(),
        tap( errorMessage => {
          // prevents displaying error messages before user interaction
          if (this.control.touched) {
            this.setError(errorMessage);
          }
        })
      ).subscribe(),
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }
    this.ref.instance.text = text;
  }

  handleErrors() {
    return map(() => {
      const controlErrors = this.control.errors;
      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.errors[firstKey] || this.errors['default'];
        const text = getError(controlErrors[firstKey]);
        return text;
      } else {
        return null;
      }
    });
  }
}

