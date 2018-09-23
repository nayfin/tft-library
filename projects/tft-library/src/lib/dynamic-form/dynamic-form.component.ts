import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'tft-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: 'dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
  @Input() config: any[] = [];

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  createGroup() {
    return this.loopThroughControls(this.config);
  }

  handleSubmit() {
    this.submitted.emit(this.form.value);
  }

  loopThroughControls(config) {
    const group = this.fb.group({});

    config.forEach(controlConfig => {

      if ( Array.isArray(controlConfig) ) {
        return this.loopThroughControls(controlConfig);
      } else {
        const control = this.fb.control(
          controlConfig.value || null,
          controlConfig.validators || null
        );
        group.addControl(controlConfig.controlName, control);
      }
    });
    return group;
  }

  isFieldAnArray( field ) {
    return Array.isArray(field);
  }
}
