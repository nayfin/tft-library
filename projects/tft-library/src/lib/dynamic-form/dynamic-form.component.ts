import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig } from './dynamic-field-config';
import { DynamicFormService } from './dynamic-form.service';
@Component({
  selector: 'tft-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: 'dynamic-form.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormConfig;
  @Input() value: any = null;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  constructor(
    private dynamicFormService: DynamicFormService
  ) { }

  ngOnInit() {
    // build out the form and set it on the class
    this.form = this.dynamicFormService.buildFormGroupFromConfig(this.config, this.value);
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
      control.updateValueAndValidity({emitEvent: true, onlySelf: true});
      // if the control is a formGroup or FormArray dig in recursively
      if (!!control.hasOwnProperty('controls')) {
        this.triggerOnChangesForChildren((control as FormGroup) );
      }
    });
  }
}
