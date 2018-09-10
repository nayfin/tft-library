import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectFieldConfig } from './select-field-config';
// import { ConditionalFieldsService } from '../conditional-fields.service';
// import { BaseField } from '../base-field';
// import { MatFormField } from '@angular/material';
// import { container } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'tft-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit, AfterViewInit {

  config: SelectFieldConfig;
  group: FormGroup;


  // @ViewChild('container') container: MatFormField;

  constructor(
    // private el: ElementRef,
    // private attrs: AttrsService,
    // private renderer: Renderer2
  ) { }

  ngOnInit() {
    // TODO: add other types here as new function make new configurations necessary
    // this.attrs.setAttrs(this.conditionalFields, this.el);
  }

  ngAfterViewInit() {
    // console.log('container', this.container);
    // if ( this.container ) {
    //   this.setAttrs( this.config, this.container._elementRef.nativeElement );
    // }
  }

  // setAttrs(config, el) {
  //   const attrs: Attr[] = config.attrs || [];
  //   if ( attrs.length > 0 ) {
  //     attrs.forEach( (attr, i) => {
  //       console.log('attr', attr);
  //       this.renderer.setAttribute(el, attr.name, attr.value );
  //     });
  //   }
  // }
}

