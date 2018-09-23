import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AnyFieldConfig } from './dynamic-field-config';

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
    this.form = this.buildFormGroupFromConfig(this.config);
  }

  handleSubmit() {
    this.submitted.emit(this.form.value);
  }

  /**
   * Recursively cycles through config building out form as it goes.
   * @param config
   */
  buildFormGroupFromConfig(config) {
    const group = this.fb.group({});

    config.forEach(controlConfig => {
      // if controlConfig isConfigForFormGroup then it represents another group of fields that need to be built out
      if ( this.isConfigForFormGroup(controlConfig) ) {
        // so we dig in recursively and start cycling throug child group
        return this.buildFormGroupFromConfig(controlConfig);
      } else {
        // if not isConfigForFormGroup then we build a formControl for the form
        const control = this.fb.control(
          controlConfig.value || null,
          controlConfig.validators || null
        );
        // then add a control to the group using the controlName from configuration
        group.addControl(controlConfig.controlName, control);
      }
    });
    return group;
  }
  /**
   *
   * @param field config field to check if should build out new formGroup
   */
  isConfigForFormGroup( field: AnyFieldConfig | AnyFieldConfig[] ): boolean {
    return Array.isArray(field);
  }

}
