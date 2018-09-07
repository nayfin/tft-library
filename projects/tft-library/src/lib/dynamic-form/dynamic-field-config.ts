import { Validator, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { WatchControlConfig } from './conditional-fields.service';

export interface DynamicFieldConfig {
  controlType: ControlType;
  controlName: string;
  label?: string;
  classes?: string[];
  showField?: (form: FormGroup, config?: any ) => Observable<boolean>;
  displayConfig?: WatchControlConfig;
  validators?: Validator[];
  placeholder?: string;
  value?: string | number;
}


// export interface DisplayConfig {
//   controlName: string;
//   values: string[];
// }

export enum ControlType {
  INPUT = 'input',
  SELECT = 'select',
  BUTTON = 'button'
}
