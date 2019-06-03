import { Injectable } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ControlType, FormConfig, DynamicFieldConfig, AnyFieldConfig, FormGroupListConfig } from './dynamic-field-config';

@Injectable({
  providedIn: 'root'
})

export class DynamicFormService {
  constructor(
    private fb: FormBuilder,
  ) { }

  buildFormGroupFromConfig(config: FormConfig, value: any = null, group: FormGroup = this.fb.group({}) ) {

    config.fields.forEach( (controlConfig: AnyFieldConfig) => {
      // if it's not a button config
      if (controlConfig.controlType !== ControlType.BUTTON) {
      // then add a control to the group using the controlName from configuration
        const {controlName} = controlConfig;
        const controlValue = value && isRealValue(value[controlName])
                           ? value[controlName]
                           : null;
        group.addControl(controlConfig.controlName, this.getControlForType(controlConfig, controlValue));
      }
    });
    return group;
  }

  getControlForType(controlConfig: AnyFieldConfig, value: any) {
    // build form control out based on the control type
    const control = controlConfig.controlType === ControlType.GROUP
      ? this.buildFormGroupFromConfig(controlConfig as FormConfig, value)
      : controlConfig.controlType === ControlType.GROUP_LIST
      ? this.fb.array([])
      : this.fb.control(
        isRealValue(value) ? value : null,
        (controlConfig as DynamicFieldConfig).validators || null
      );

    if (controlConfig.controlType === ControlType.GROUP_LIST && Array.isArray(value)) {
      value.forEach( item => {
        (control as FormArray).push( this.getControlForType((controlConfig as FormGroupListConfig).itemConfig, item));
      });
    }
    return control;
  }
}
/**
 * returns true for all truthy values and zero
 * sometimes you need the value zero
 * @param value the value to evaluate
 */
function isRealValue(value: any) {
  return !!value || value === 0;
}