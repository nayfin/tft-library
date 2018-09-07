import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';


const components = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent,
};

@Directive({
  selector: '[tftDynamicField]'
})
export class DynamicFieldDirective implements OnInit {

  @Input() config;
  @Input() group: FormGroup;

  @Input() customButton: any;
  component;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    const component = components[this.config.controlType];
    const factory = this.resolver.resolveComponentFactory<any>(component);
    this.component = this.container.createComponent(factory);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
