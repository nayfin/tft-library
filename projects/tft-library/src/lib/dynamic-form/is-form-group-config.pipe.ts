import { Pipe, PipeTransform } from '@angular/core';
import { AnyFieldConfig } from './dynamic-field-config';

@Pipe({
  name: 'isFormGroupConfig'
})
export class IsFormGroupConfigPipe implements PipeTransform {
  /**
   *
   * @param field config field to check if should build out new formGroup
   */
  transform( field: AnyFieldConfig | AnyFieldConfig[] ): boolean {
    return Array.isArray(field);
  }

}
