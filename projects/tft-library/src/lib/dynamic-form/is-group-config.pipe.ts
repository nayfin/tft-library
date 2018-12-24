import { Pipe, PipeTransform } from '@angular/core';
import { AnyFieldConfig, ControlType } from './dynamic-field-config';

@Pipe({
  name: 'isGroupConfig'
})
export class IsGroupConfigPipe implements PipeTransform {

  transform(field: AnyFieldConfig): any {
    // checks for controlType to determine if configuration is for a field or group of fields
    return field.controlType === ControlType.GROUP;
  }
}
