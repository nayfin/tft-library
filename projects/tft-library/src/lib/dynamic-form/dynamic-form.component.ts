import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AnyFieldConfig } from './dynamic-field-config';
import { IsGroupConfigPipe } from './is-group-config.pipe';
@Component({
  selector: 'tft-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: 'dynamic-form.component.html',
  providers: [IsGroupConfigPipe]
})
export class DynamicFormComponent implements OnInit {
  @Input() config: any[] = [];

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private isGroupConfig: IsGroupConfigPipe
  ) {}

  ngOnInit() {
    this.form = this.buildFormGroupFromConfig(this.config);
  }

  handleSubmit() {
    this.submitted.emit(this.form.value);
  }

  /**
   * Recursively cycles through config building out form as it goes.
   * @param config defines shape of form
   */
  buildFormGroupFromConfig(config) {
    const group = this.fb.group({});
    console.log({config});
    config.forEach( (controlConfig: AnyFieldConfig) => {
      // if controlConfig isConfigForFormGroup then it represents another group of fields that need to be built out
      // also notice we use the pipe isFormGroupConfig transform method here to check if the controlConfig is actually a group configuration
      // seems weird but we need to use this in the template to improve performance so importing pipe this way let's us reuse that code
      if ( this.isGroupConfig.transform(controlConfig) ) {
        // so we dig in recursively and start cycling throug child group
        return this.buildFormGroupFromConfig(controlConfig);
      } else {
        // if not isGroupConfig then we build a formControl for the form
        // console.log({controlConfig});

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

  // isGroupConfig( field: AnyFieldConfig | AnyFieldConfig[] ): boolean {
  //   const isConfig = !('controlName' in field);
  //   // console.log(isConfig, field);
  //   return isConfig;
  // }

}
