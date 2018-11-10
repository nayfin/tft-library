import { Pipe, PipeTransform } from '@angular/core';
import { AnyFieldConfig } from './dynamic-field-config';

@Pipe({
  name: 'isGroupConfig'
})
export class IsGroupConfigPipe implements PipeTransform {

  transform(field: AnyFieldConfig | AnyFieldConfig[]): any {
    // checks for controlName key to determine if configuration is for a field or group of fields
    return !('controlName' in field);
  }
}
