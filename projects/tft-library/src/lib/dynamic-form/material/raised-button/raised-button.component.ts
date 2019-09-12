
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFieldConfig } from '../../models';

@Component({
  selector: 'tft-raised-button',
  templateUrl: './raised-button.component.html',
  styleUrls: ['./raised-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaisedButtonComponent implements OnInit {

  config: DynamicFieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }
}