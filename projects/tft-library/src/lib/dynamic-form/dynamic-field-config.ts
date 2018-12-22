import { FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

import { SelectFieldConfig } from './form-select/select-field-config';
import { WatchControlConfig } from './conditional-fields.service';
import { InputFieldConfig } from './form-input/input-field-config';

interface DynamicFieldConfig {
  controlType: string;
  controlName: string;
  label?: string;
  placeholder?: string;
  classes?: string[];
  attrs?: Attr[];
  flexLayoutConfig?: any;
  // function that returns an observable that resolves to a boolean
  showField?: (form: FormGroup, config?: any ) => Observable<boolean>;
  displayConfig?: WatchControlConfig | any; // any is required for user defined configs, TODO: maybe offer way to add type to config
  validators?: ValidatorFn[];
  value?: string | number;
}

interface FormConfig {
  controlType: string;
  controlName: string;
  fields: AnyFieldConfig[];
}

type AnyFieldConfig = DynamicFieldConfig | SelectFieldConfig | InputFieldConfig | FormConfig;

interface Attr {
  name: string;
  value: string;
}

enum ControlType {
  INPUT = 'input',
  SELECT = 'select',
  BUTTON = 'button',
  GROUP = 'group'
}

const exampleFormConfig: FormConfig = {
  controlType: ControlType.GROUP,
  controlName: 'testGroup',
  fields: [
    {
      controlType: ControlType.INPUT,
      controlName: 'test',
    },
    {
      controlType: 'group',
      controlName: 'testSubGroup',
      fields: [
        {
          controlType: ControlType.INPUT,
          controlName: 'test'
        }
      ]
    }
  ]
};

export {ControlType, AnyFieldConfig, DynamicFieldConfig, FormConfig, Attr};
