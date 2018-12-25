import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormArrayConfig, ControlType, DynamicFieldConfig } from '../dynamic-field-config';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
  selector: 'tft-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit {

  config: FormArrayConfig;
  group: FormGroup;

  addItemLabel = 'Add Item';
  controlType = ControlType;
  constructor(
    private dynamicFormService: DynamicFormService
    // private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // console.log({formArrayConfig: this.config});

    // console.log('group', this.group);
    // this.inputType = this.config. || 'text';
  }

  getFormArray(controlName: string): FormArray {
    const formArr = this.group.get(controlName) as FormArray;
    console.log({formArr});
    return formArr;
  }

  addControl() {
    this.getFormArray(this.config.controlName).push(this.dynamicFormService.getControlForType(this.config.itemConfig) );
  }
}
