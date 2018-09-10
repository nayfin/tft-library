import { Injectable, Renderer2 } from '@angular/core';
import { Attr } from './dynamic-field-config';

@Injectable({
  providedIn: 'root'
})
export class AttrsService {

  constructor(
    // private renderer: Renderer2
  ) { }

  setAttrs(config, el, renderer: Renderer2) {
    const attrs: Attr[] = config.attrs || [];
    if ( attrs.length > 0 ) {
      attrs.forEach( (attr, i) => {
        console.log('setting attr', i);
        renderer.setAttribute(el.nativeElement, attr.name, attr.value );
      });
    }
  }

}