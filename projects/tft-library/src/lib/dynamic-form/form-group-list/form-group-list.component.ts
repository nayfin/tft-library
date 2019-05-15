import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

import { DynamicFormService } from '../dynamic-form.service';
import { FormGroupListConfig } from './form-group-list.config';

@Component({
  selector: 'tft-form-group-list',
  templateUrl: './form-group-list.component.html',
  styleUrls: ['./form-group-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupListComponent implements OnInit {


  config: FormGroupListConfig;
  group: FormGroup;
  addItemLabel: string;
  formArray: FormArray;
  minListLength: number;
  constructor(
    private dynamicFormService: DynamicFormService
  ) { }

  ngOnInit() {
    this.addItemLabel = this.config.addItemLabel || 'ADD ITEM';
    this.minListLength = Number.isInteger(this.config.minListLength) ? this.config.minListLength : 1;
    this.formArray = this.getFormArray(this.group, this.config.controlName);
  }

  getFormArray(group: FormGroup, controlName: string): FormArray {
    return group.get(controlName) as FormArray;
  }

  addGroup(value = null) {
    this.formArray.push( this.dynamicFormService.getControlForType(this.config.itemConfig, value) );
  }

  deleteGroup(index: number) {
    this.formArray.removeAt(index);
  }
}


