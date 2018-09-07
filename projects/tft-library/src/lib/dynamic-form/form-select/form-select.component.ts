import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { SelectFieldConfig } from './select-field-config';
import { ConditionalFieldsService } from '../conditional-fields.service';
import { AttrsService } from '../attrs.service';

@Component({
  selector: 'tft-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

  config: SelectFieldConfig;
  group: FormGroup;

  showField: Observable<boolean>;

  constructor(
    private conditionalFields: ConditionalFieldsService,
    private el: ElementRef,
    private attrs: AttrsService
  ) { }
  // TODO: maybe instead of dependent field waiting for change through internal logic and an *ngIf,
  // the prerequisite control can drive the change

  ngOnInit() {
    // TODO: add other types here as new function make new configurations necessary
    this.showField = this.conditionalFields.connectShowField(this.group, this.config);
    this.attrs.setAttrs(this.conditionalFields, this.el);
  }
}
