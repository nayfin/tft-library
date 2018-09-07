import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SelectFieldConfig } from './select-field-config';
import { ConditionalFieldsService, WatchControlConfig } from '../conditional-fields.service';

@Component({
  selector: 'tft-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

  config: SelectFieldConfig;
  group: FormGroup;

  isControlDisplayed: Observable<boolean>;

  constructor(
    public conditionalFields: ConditionalFieldsService
  ) {}
  // TODO: maybe instead of dependent field waiting for change through internal logic and an *ngIf,
  // the prerequisite control can drive the change

  ngOnInit() {
    // TODO: add other types here as new function make new configurations necessary
    const displayConfig: WatchControlConfig = this.config.displayConfig;

    this.isControlDisplayed = this.config.showField
                            ? this.config.showField( this.group, displayConfig || null)
                            : of(true);

    // this.isControlDisplayed = this.conditionalFields.watchControlForValues(displayConfig, this.group);
    // if no config supplied then it is a static control and d
    // if (displayConfig ) {
    //   this.isControlDisplayed = this.group.get(displayConfig.controlName).valueChanges.pipe(
    //     map( (value) => {
    //       return displayConfig.values.includes(value);
    //     })
    //   );
    // } else {
    //   this.isControlDisplayed = of(true);
    // }
  }
}
