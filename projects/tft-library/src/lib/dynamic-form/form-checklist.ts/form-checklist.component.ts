import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DEFAULT_EMPTY_OPTIONS_MESSAGE } from './checklist-field-config';
import { ChecklistFieldConfig } from './checklist-field-config';

@Component({
  selector: 'tft-form-checklist',
  templateUrl: './form-checklist.component.html',
  styleUrls: ['./form-checklist.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent implements OnInit {

  config: ChecklistFieldConfig;
  group: FormGroup;

  // options$: Observable<any[]>;
  constructor( ) { }

  ngOnInit() {
    // If options are passed in as a function that returns a promise then account for that
  //   if (this.config.optionsCallback && this.config.optionsCallback instanceof Function) {
  //     this.config.optionsCallback().then( (options) => {
  //       this.options = options;
  //     });
  //   // if it's an array of options handle that
  //   } else if (this.config.options && Array.isArray(this.config.options)) {
  //     this.options = this.config.options;
  //   // if it's empty desplay a message
  //   } else {
  //     this.options =  [
  //       {
  //       label: this.config.emptyOptionsMessage || DEFAULT_EMPTY_OPTIONS_MESSAGE,
  //       value: null
  //       }
  //     ];
  //   }
  }
}

