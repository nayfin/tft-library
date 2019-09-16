import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormConfig } from '../models';

@Component({
  selector: 'tft-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent implements OnInit {

  @Input() config: FormConfig;

  group: FormGroup;
  subGroup: AbstractControl;

  constructor() { }

  ngOnInit() {
    this.subGroup = this.group.get(this.config.controlName);
  }
}
