import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DynamicFieldConfig } from '../dynamic-field-config';
import { Observable, of, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

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
  // used to determine whether or not field should be shown
  showField: Observable<boolean>;

  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.showField = this.connectShowField(this.group, this.config);

    if (this.config.computeField && this.config.computeFieldConfig) {
      this.subs.push(
        this.config.computeField(this.group, this.config.computeFieldConfig).subscribe()
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }
  /**
   * used to pass formGroup and an optional configuration file to the showField parameter
   *
   * if function exists on config then will pass it to parameter, else passes observable of true
   * @param group used to get valueChanges from control
   * @param config configuration object used to
   */
  connectShowField( group: FormGroup, config: DynamicFieldConfig) {
    return config.showField && config.showField instanceof Function
         ? config.showField( group, config.showFieldConfig || null)
         : of(true);
  }

}
