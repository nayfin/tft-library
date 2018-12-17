import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IsGroupConfigPipe } from './is-group-config.pipe';
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

  component;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private isGroupConfig: IsGroupConfigPipe
  ) {}

  ngOnInit() {

    /**
     * if the config is not an array than it represents a form group that needs to be created,
     *
     * if it is array it represents a formGroup and the directive doesn't have a component to create so we do nothing
     */
    if ( !this.isGroupConfig.transform(this.config) ) {
      const component = components[this.config.controlType];
      const factory = this.resolver.resolveComponentFactory<any>(component);
      this.component = this.container.createComponent(factory);
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }
}
