import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig } from './dynamic-field-config';
import { DynamicFormService } from './dynamic-form.service';
@Component({
  selector: 'tft-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: 'dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormConfig;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  constructor(
    private dynamicFormService: DynamicFormService
  ) { }

  ngOnInit() {
    this.form = this.dynamicFormService.buildFormGroupFromConfig(this.config);
  }

  handleSubmit() {
    this.submitted.emit(this.form);
  }
}
