import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupListComponent } from './form-group-list/form-group-list.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { AnyFieldConfig } from './models';
import {
  InputFieldComponent,
  SelectFieldComponent,
  AutocompleteFieldComponent,
  CheckboxFieldComponent,
  TextareaFieldComponent,
  RaisedButtonComponent
} from './material';

const components = {
  button: RaisedButtonComponent,
  input: InputFieldComponent,
  select: SelectFieldComponent,
  group: FormGroupComponent,
  groupList: FormGroupListComponent,
  autocomplete: AutocompleteFieldComponent,
  textarea: TextareaFieldComponent,
  checkbox: CheckboxFieldComponent
};

@Directive({
  selector: '[tftDynamicField]'
})
export class DynamicFieldDirective implements OnInit {

  @Input() config: AnyFieldConfig;
  @Input() group: FormGroup;

  // TODO: strongly type component
  component: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
  ) {}

  ngOnInit() {

    /**
     * create component and set values from config on its instance
     */
    const component = components[this.config.controlType];
    const factory = this.resolver.resolveComponentFactory<any>(component);
    this.component = this.container.createComponent(factory).instance;
    this.component.config = this.config;
    this.component.group = this.group;
  }
}
