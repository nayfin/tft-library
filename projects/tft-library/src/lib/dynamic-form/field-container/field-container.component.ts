import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DynamicFieldConfig } from '../models';
import { Observable, of, Subscription } from 'rxjs';
import { FormGroup, AbstractControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'tft-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldContainerComponent implements OnInit, OnDestroy {
  // the configuration object for the field
  @Input() config: DynamicFieldConfig;
  // the parent formGroup
  @Input() group: FormGroup;
  // boolean whether field-container is inline
  @Input() inlineField = false;
  // used to determine whether or not field should be shown
  showField: Observable<boolean>;
  alignFormWithView$: Observable<boolean>;
  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.showField = this.connectShowField(this.group, this.config);
    if (this.config.computeField && this.config.computeFieldConfig) {
      // if no controlNameToSet is specified use this control's controlName
      // TODO: this might not be the best place to set defaults...
      const computeFieldConfig = {
        controlNameToSet: this.config.controlName,
        ...this.config.computeFieldConfig
      };
      this.subs.push(
        this.config.computeField(this.group, computeFieldConfig).subscribe()
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }
  /**
   * Connects user defined show field function to the the view, so that the UI is shown/hidden
   * appropriately. It also keeps the form value in line with the view i.e. adds/removes field value
   * from form value as it is shown/hidden. We call it here because it will effect all form fields and
   * we have easy access to the form group and field configuration here.
   * @param group used to get valueChanges from control
   * @param config configuration object used to
   */
  connectShowField(group: FormGroup, config: DynamicFieldConfig = null) {
    const control = group.get(config.controlName);
    // If the showField function exists on the field config then call it with the showFieldConfig
    // as a parameter otherwise return an observable of true.
    return config.showField && config.showField instanceof Function
      ? config.showField(group, config.showFieldConfig || null).pipe(
        // This enables/disables control when when it is shown/hidden keeping form form value inline with view
        tap(this.alignFormWithView(control)),
      )
      : of(true);
  }

  /**
   * We use this function to align the form values with the changes to the view. i.e. when a value is removed from the view.
   * We don't want the form to still emit that value when submitted or throw validation errors on a field that has been removed.
   * @param control the control we want to disable/enable when we are hiding/showing
   */
  alignFormWithView(control: AbstractControl) {
    return ((shouldShowField: boolean) => {
      if (!shouldShowField) {
        control.disable();
      } else if (shouldShowField) {
        control.enable();
      }
    });
  }
}
