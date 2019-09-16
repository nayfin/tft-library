import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig } from './models';
import { buildFormGroupFromConfig } from './dynamic-form.helpers';
@Component({
  selector: 'tft-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: 'dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  // if no form has been passed in by consuming component, we create an empty group to build out
  @Input() form: FormGroup = new FormGroup({});
  @Input() config: FormConfig;
  @Input() value: any = null;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  constructor( ) { }

  ngOnInit() {
    // build out the form, not we pass in the form as the third argument and the function modifies it
    // TODO: code smell, a function modifies the state of one of its arguments (this.form). There should be a better way to do this
    buildFormGroupFromConfig(this.config, this.value, this.form);
    // If values are passed in trigger onChanges on each control so that showField controlled fields respond appropriately
    if (this.value) {
      setTimeout( () => {
        this.triggerOnChangesForChildren(this.form);
      });
    }
  }

  handleSubmit() {
    this.submitted.emit(this.form);
  }
  /**
   * Runs through a FormGroup controls recursively triggering valueChanges on all descendants controls
   * @param formGroup formGroup that needs all its controls to have valueChanges triggered
   */
  triggerOnChangesForChildren( formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach( (controlName) => {
      const control = formGroup.get(controlName);
      if (!!control) {
        control.updateValueAndValidity({emitEvent: true, onlySelf: true});
        // if the control is a formGroup or FormArray dig in recursively
        if (!!control.hasOwnProperty('controls')) {
          this.triggerOnChangesForChildren((control as FormGroup) );
        }
      }
    });
  }
}
