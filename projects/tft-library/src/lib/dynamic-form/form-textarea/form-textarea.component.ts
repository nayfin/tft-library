import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { TextareaFieldConfig } from './textarea-field-config';

@Component({
  selector: 'tft-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class FormTextareaComponent implements OnInit {

  config: TextareaFieldConfig;
  group: FormGroup;
  rows: number;

  constructor() { }

  ngOnInit() {
    this.rows = this.config.rows || 5;
  }
}
