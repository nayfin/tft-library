import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputFieldConfig } from './input-field-config';
import { Observable, of } from 'rxjs';
import { WatchControlConfig } from '../conditional-fields.service';

@Component({
  selector: 'tft-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})

export class FormInputComponent implements OnInit {

  config: InputFieldConfig;
  group: FormGroup;

  isControlDisplayed: Observable<boolean>;

  constructor() { }

  ngOnInit() {
    // console.log('group', this.group);
    const displayConfig: WatchControlConfig = this.config.displayConfig;

    this.isControlDisplayed = this.config.showField
                            ? this.config.showField(this.group, displayConfig)
                            : of(true);

  }
}
