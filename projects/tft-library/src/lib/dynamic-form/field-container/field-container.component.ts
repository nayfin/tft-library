import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DynamicFieldConfig } from '../dynamic-field-config';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tft-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldContainerComponent implements OnInit {
  // the configuration object for the field
  @Input() config: DynamicFieldConfig;
  // the parent formGroup
  @Input() group: FormGroup;
  // used to determine whether or not field should be shown
  showField: Observable<boolean>;

  constructor() { }

  ngOnInit() {
    this.showField = this.connectShowField(this.group, this.config);
  }
  /**
   * used to pass formGroup and an optional configaration file to the showField parameter
   *
   * if function exists on config then will pass it to parameter, else passes observable of true
   * @param group used to get valueChanges from control
   * @param config configuration object used to
   */
  connectShowField( group: FormGroup, config) {
    return config.showField && config.showField instanceof Function
         ? config.showField( group, config.displayConfig || null)
         : of(true);
  }

}
