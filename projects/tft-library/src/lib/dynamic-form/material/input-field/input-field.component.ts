import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputFieldConfig } from '../../models';

@Component({
  selector: 'tft-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent implements OnInit {

  config: InputFieldConfig;
  group: FormGroup;
  inputType: string;
  constructor(
  ) { }

  ngOnInit() {
    this.inputType = this.config.inputType || 'text';
  }

}
