import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { CheckboxFieldConfig } from '../../models';

@Component({
  selector: 'tft-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxFieldComponent implements OnInit {

  config: CheckboxFieldConfig;
  group: FormGroup;
  labelPosition: 'before' | 'after';
  inline: boolean;

  constructor() { }

  ngOnInit() {
    this.labelPosition = this.config.labelPosition || 'after';
    this.inline = this.config.inline || false;
  }
}
