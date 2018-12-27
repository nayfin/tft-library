import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormConfig } from '../dynamic-field-config';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
  selector: 'tft-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  @Input() config: FormConfig;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  group: FormGroup;
  subGroup: AbstractControl;

  constructor(
    private dynamicFormService: DynamicFormService
  ) {
    console.log('constructor', this.group);

  }

  ngOnInit() {
    this.subGroup = this.group.get(this.config.controlName);
    console.log('after', this.group);
  }

  // handleSubmit() {
  //   this.submitted.emit({
  //     form: this.group
  //   });
  // }
}
