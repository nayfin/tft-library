import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { ControlType } from '../dynamic-field-config';
import { DynamicFormService } from '../dynamic-form.service';
import { FormGroupListConfig } from './form-group-list.config';

@Component({
  selector: 'tft-form-group-list',
  templateUrl: './form-group-list.component.html',
  styleUrls: ['./form-group-list.component.scss']
})
export class FormGroupListComponent implements OnInit {


  config: FormGroupListConfig;
  group: FormGroup;
  addItemLabel: string;
  constructor(
    private dynamicFormService: DynamicFormService
  ) { }

  ngOnInit() {
    this.addItemLabel = this.config.addItemLabel || 'ADD ITEM';
  }

  getFormArray(group: FormGroup, controlName: string): FormArray {
    return group.get(controlName) as FormArray;
  }

  addControl() {
    this.getFormArray(this.group, this.config.controlName).push(this.dynamicFormService.getControlForType(this.config.itemConfig));
  }
}


