import { Validator, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { WatchControlConfig } from './conditional-fields.service';

export interface DynamicFieldConfig {
  controlType: ControlType;
  controlName: string;
  label?: string;
  placeholder?: string;
  classes?: string[];
  attrs?: Attr[];
  showField?: (form: FormGroup, config?: any ) => Observable<boolean>;
  displayConfig?: WatchControlConfig;
  validators?: Validator[];
  value?: string | number;
}


// export interface DisplayConfig {
//   controlName: string;
//   values: string[];
// }

export interface Attr {
  name: string;
  value: string;
}

export enum ControlType {
  INPUT = 'input',
  SELECT = 'select',
  BUTTON = 'button'
}
