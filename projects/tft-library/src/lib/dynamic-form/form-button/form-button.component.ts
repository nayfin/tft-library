import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tft-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {

  config;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  handleSubmit() {
    console.log('this.group', this.group);
  }

}
