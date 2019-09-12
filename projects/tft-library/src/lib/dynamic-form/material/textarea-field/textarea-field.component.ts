import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { TextareaFieldConfig } from '../../models';

@Component({
  selector: 'tft-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaFieldComponent implements OnInit {

  config: TextareaFieldConfig;
  group: FormGroup;
  rows: number;

  constructor() { }

  ngOnInit() {
    this.rows = this.config.rows || 5;
  }
}

