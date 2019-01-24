import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { <%= singular(classify(name)) %> } from '../../state';
import { ControlType, FormConfig } from 'tft-library';

@Component({
  selector: '<%= selector %>-form',
  templateUrl: './<%= singular(dasherize(name)) %>-form.component.html',
  styleUrls: ['./<%= singular(dasherize(name)) %>-form.component.<%= styleext %>']
})
export class <%= singular(classify(name)) %>FormComponent implements OnInit {

  @Input() <%= singular(camelize(name)) %>: <%= singular(classify(name)) %>;
  @Output() formSubmitted = new EventEmitter();

  <%= singular(camelize(name)) %>Config: FormConfig = {
    controlName: 'varietyForm',
    controlType: ControlType.GROUP,
    fields: [
      {
        controlType: 'input',
        label: '<%= singular(classify(name)) %> name',
        inputType: 'text',
        controlName: 'name',
        placeholder: 'Enter name of <%= singular(classify(name)) %>',
        validators: [Validators.required],
      },
      {
        controlType: 'input',
        label: '<%= singular(classify(name)) %> value',
        inputType: 'text',
        controlName: 'value',
        placeholder: 'Enter value for <%= singular(classify(name)) %>',
        validators: [Validators.required],
      },
      {
        label: 'Submit',
        controlName: 'submit',
        controlType: ControlType.BUTTON,
      }
    ]
  }
  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.formSubmitted.emit(form);
    } else {
      this.snackBar.open('Form is incomplete', 'CLOSE', { duration: 3000 });
    }
  }
}
