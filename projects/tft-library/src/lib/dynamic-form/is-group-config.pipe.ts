import { Pipe, PipeTransform } from '@angular/core';
import { AnyFieldConfig } from './dynamic-field-config';

@Pipe({
  name: 'isGroupConfig'
})
export class IsGroupConfigPipe implements PipeTransform {

  transform(field: AnyFieldConfig | AnyFieldConfig[]): any {
    const isConfig = !('controlName' in field);
    // console.log(isConfig, field);
    return isConfig;  }

  // isGroupConfig( field: AnyFieldConfig | AnyFieldConfig[] ): boolean {
  //   const isConfig = !('controlName' in field);
  //   console.log(isConfig, field);
  //   return isConfig;
  // }

}
