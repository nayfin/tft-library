import {
  Directive, Self, OnInit, OnDestroy, Optional, Host,
  ComponentRef, ComponentFactoryResolver, ViewContainerRef, Inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, EMPTY, Observable, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FORM_ERRORS } from './form-errors';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@Directive({
  // we want to hook into all formControls so we use these selectors
  // tslint:disable-next-line: directive-selector
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {

  ref: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  submit$: Observable<{}>;

  subs: Subscription[] = [];

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
        this.control.valueChanges
      ).pipe(
        this.handleErrors(),
        tap( errorMessage => {
          this.setError(errorMessage)
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
      const errors = FORM_ERRORS.ngInjectableDef;
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

