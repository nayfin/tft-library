import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormArrayConfig } from './form-array-config';

@Component({
  selector: 'tft-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit {

  config: FormArrayConfig;
  group: FormGroup;

  addItemLabel = 'Add Item';

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    console.log({formArrayConfig: this.config});

    console.log('group', this.group);
    // this.inputType = this.config. || 'text';
  }

  getFormArray(): FormArray {
    const formArr = this.group.get(this.config.controlName) as FormArray;
    // console.log({formArr});
    return formArr;
  }

  addControl() {
    this.getFormArray().push( this.fb.group( this.fb.control('name', null) ) );
  }

  createControl( config: any) {
    console.log('creating', config);
    const group = this.fb.group({ });
  }
}
