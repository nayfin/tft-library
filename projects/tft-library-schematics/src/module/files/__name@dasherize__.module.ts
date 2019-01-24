import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModule, DynamicFormModule } from 'tft-library';
// modules
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';
// components
import { <%= classify(name) %>ListComponent } from './containers/<%= dasherize(name) %>-list/<%= dasherize(name) %>-list.component';
import { <%= singular(classify(name)) %>FormComponent } from './components/<%= singular(dasherize(name)) %>-form/<%= singular(dasherize(name)) %>-form.component';
import { <%= singular(classify(name)) %>NewComponent  } from './containers/<%= singular(dasherize(name)) %>-new/<%= singular(dasherize(name)) %>-new.component';
import { <%= singular(classify(name)) %>EditComponent } from './containers/<%= singular(dasherize(name)) %>-edit/<%= singular(dasherize(name)) %>-edit.component';
import { <%= singular(classify(name)) %>CopyComponent } from './containers/<%= singular(dasherize(name)) %>-copy/<%= singular(dasherize(name)) %>-copy.component';

const COMPONENTS = [
  <%= classify(name) %>ListComponent,
  <%= singular(classify(name)) %>FormComponent,
  <%= singular(classify(name)) %>NewComponent,
  <%= singular(classify(name)) %>EditComponent,
  <%= singular(classify(name)) %>CopyComponent
];

@NgModule({
  imports: [
    <%= classify(name) %>RoutingModule,
    CommonModule,
    DesignModule,
    DynamicFormModule
  ],
  declarations: COMPONENTS,
})
export class <%= classify(name) %>Module { }
