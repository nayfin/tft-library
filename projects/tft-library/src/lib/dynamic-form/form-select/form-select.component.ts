import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayConfig } from '../dynamic-field-config';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SelectFieldConfig } from './select-field-config';
import { ConditionalFieldsService } from '../conditional-fields.service';

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
    const displayConfig: DisplayConfig = this.config.displayConfig;
    this.isControlDisplayed = this.conditionalFields.createWatcher(displayConfig, this.group);
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
