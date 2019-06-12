import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DynamicFieldConfig } from '../dynamic-field-config';
import { Observable, of, Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'tft-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldContainerComponent implements OnInit, OnDestroy {
  // the configuration object for the field
  @Input() config: DynamicFieldConfig;
  // the parent formGroup
  @Input() group: FormGroup;
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
   * If the showField function exists on the config then call it with the showFieldConfig as a parameter.
   * otherwise return an observable of true. We call it here because it will effect all form fields and
   * we have easy access to the form group and field configuration here.
   * @param group used to get valueChanges from control
   * @param config configuration object used to
   */
  connectShowField(group: FormGroup, config: DynamicFieldConfig) {
    return config.showField && config.showField instanceof Function
      ? config.showField(group, config.showFieldConfig || null).pipe(
        // TODO: This is not where we want to run this effect, but it is convenient for now. All the pieces we need are available
        tap(alignFormWithView(group, config))
      )
      : of(true);
  }

}
/**
 * We use this function to align the form values with the changes to the view. i.e. when a value is removed from the view,
 * we don't want the form to still emit that value when submitted or throw validation errors on a field that has been removed.
 * TODO: So far there are two ways to accomplish this, neither are working out yet.
 * 
 * 1) Removing field from form completely when hidden and adding a new control back in when showing the field. 
 * There is an issue reconnecting the view value with the form after add the control back to the form
 * 
 * 2) Clearing the values and validators when hiding field and resetting validators when showing.
 *  The form would still have the key for the hidden field in it's value object this way. This could be a bug or a feature.
 * @param group 
 * @param config 
 */
function alignFormWithView(group: FormGroup, config: DynamicFieldConfig) {
  return ((shouldShowField: boolean) => {
    let control = group.get(config.controlName);
    console.log({ control })
    if (!shouldShowField) {

      // clearing value and validators method
      control.reset();
      control.clearValidators();

      // removing control method
      // group.removeControl(config.controlName)
    } else if (shouldShowField && config.validators) {

      // TODO: we are probably setting validators repeatedly and unnecessarily here 
      control.setValidators(config.validators);

      // TODO: this should evaluate the config to build the control intelligently, 
      // there should be logic around somewhere to make this easy
      // control = new FormControl();
      // group.addControl(config.controlName, control);
      // control.updateValueAndValidity();
    }
  });
}
