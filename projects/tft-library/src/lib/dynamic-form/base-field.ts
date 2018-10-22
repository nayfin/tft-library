import { OnInit, Injectable, Renderer2 } from '@angular/core';
import { ConditionalFieldsService } from './conditional-fields.service';
import { Attr } from './dynamic-field-config';



export class BaseField implements OnInit {

  constructor (
    // private conditionalFields: ConditionalFieldsService,
  ) {

  }

  public ngOnInit( ) {

  }

  public setAttrs(config, el, renderer: Renderer2) {
    const attrs: Attr[] = config.attrs || [];
    if ( attrs.length > 0 ) {
      attrs.forEach( (attr, i) => {
        renderer.setAttribute(el.nativeElement, attr.name, attr.value );
      });
    }
  }

}
