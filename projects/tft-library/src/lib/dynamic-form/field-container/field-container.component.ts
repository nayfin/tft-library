import { Component, OnInit, AfterContentChecked, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DynamicFieldConfig } from '../dynamic-field-config';
import { Observable, of, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tft-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldContainerComponent implements OnInit, AfterContentChecked, OnDestroy {
  // the configuration object for the field
  @Input() config: DynamicFieldConfig;
  // the parent formGroup
  @Input() group: FormGroup;
  // used to determine whether or not field should be shown
  showField: Observable<boolean>;

  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.showField = this.connectShowField(this.group, this.config);
  }

  ngAfterContentChecked(): void {

    if (this.config.computeField && this.config.computeFieldConfig) {
      // if no controlNameToSet is specified use this control's controlName
      // TODO: this might not be the best place to set defaults...
      const computeFieldConfig = {
        controlNameToSet: this.config.controlName,
        ...this.config.computeFieldConfig
      };
      this.subs.push(
        // this.config.computeField.
        this.config.computeField(this.group, computeFieldConfig).subscribe()
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }
  /**
   * if the showField function exists on config then call it with the showFieldConfig as a parameter.
   * otherwise return observable of true. We call it here because it will effect all form fields and 
   * we have easy access to the form group and field configuration
   * @param group used to get valueChanges from control
   * @param config configuration object used to
   */
  connectShowField( group: FormGroup, config: DynamicFieldConfig) {
    return config.showField && config.showField instanceof Function
         ? config.showField( group, config.showFieldConfig || null)
         : of(true);
  }

}
