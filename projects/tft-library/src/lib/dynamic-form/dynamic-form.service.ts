import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ControlType, FormConfig, DynamicFieldConfig, AnyFieldConfig, FormGroupListConfig } from './dynamic-field-config';

@Injectable({
  providedIn: 'root'
})

export class DynamicFormService {
  constructor(
    private fb: FormBuilder,
  ) { }

  buildFormGroupFromConfig(config: FormConfig) {
    const group = this.fb.group({});

    config.fields.forEach( (controlConfig: any) => {
      // then add a control to the group using the controlName from configuration
      group.addControl(controlConfig.controlName, this.getControlForType(controlConfig));
    });
    return group;
  }

  getControlForType(controlConfig: AnyFieldConfig) {
    // build form control out based on the control type
    return controlConfig.controlType === ControlType.GROUP ? this.buildFormGroupFromConfig(controlConfig as FormConfig)
      : controlConfig.controlType === ControlType.GROUP_LIST ? this.fb.array((controlConfig as FormGroupListConfig).values || [])
      : this.fb.control(
        (controlConfig as DynamicFieldConfig).value || null,
        (controlConfig as DynamicFieldConfig).validators || null
      ) ;
  }
}
