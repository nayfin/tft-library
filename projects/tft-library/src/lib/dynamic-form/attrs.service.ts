import { Injectable, Renderer2 } from '@angular/core';
import { Attr, DynamicFieldConfig } from './dynamic-field-config';

@Injectable({
  providedIn: 'root'
})
export class AttrsService {

  constructor(
    // private renderer: Renderer2
  ) { }

  setAttrs(config: DynamicFieldConfig, el, renderer: Renderer2) {
    const attrs: Attr[] = config.attrs || [];
    attrs.forEach( (attr, i) => {
      renderer.setAttribute(el.nativeElement, attr.name, attr.value );
    });
  }
}
