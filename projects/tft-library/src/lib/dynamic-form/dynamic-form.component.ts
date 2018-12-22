import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormConfig } from './dynamic-field-config';
import { IsGroupConfigPipe } from './is-group-config.pipe';
@Component({
  selector: 'tft-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: 'dynamic-form.component.html',
  providers: [IsGroupConfigPipe]
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormConfig;

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
    this.submitted.emit({
      form: this.form
    });
  }

  /**
   * Recursively cycles through config building out form as it goes.
   * @param config defines shape of form
   */
  buildFormGroupFromConfig(config: FormConfig) {
    const group = this.fb.group({});
    config.fields.forEach( (controlConfig: any) => {
      // if controlConfig isConfigForFormGroup then it represents another group of fields that need to be built out
      // also notice we use the pipe isGroupConfig transform method here to check if the controlConfig is actually a group configuration
      // seems weird but we need to use this in the template to improve performance so importing pipe this way let's us reuse that code
      if ( this.isGroupConfig.transform(controlConfig) ) {
        // const subGroup = this.fb.group()
        // so we dig in recursively and start cycling throug child group
        group.addControl(controlConfig.controlName, this.buildFormGroupFromConfig(controlConfig));
      } else {
        // if not isGroupConfig then we build a formControl for the form
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
}
