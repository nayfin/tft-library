import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig } from './dynamic-field-config';
import { DynamicFormService } from './dynamic-form.service';
@Component({
  selector: 'tft-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: 'dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormConfig;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  group: FormGroup;

  constructor(
    private dynamicFormService: DynamicFormService
  ) {
    console.log('constructor', this.group);

  }

  ngOnInit() {
    this.group = this.dynamicFormService.buildFormGroupFromConfig(this.config);
    console.log('onInit', this.group);
  }

  handleSubmit() {
    this.submitted.emit({
      form: this.group
    });
  }
}
