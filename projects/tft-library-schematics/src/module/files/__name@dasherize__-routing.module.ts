import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= classify(name) %>ListComponent } from './containers/<%= dasherize(name) %>-list/<%= dasherize(name) %>-list.component';
import { <%= singular(classify(name)) %>NewComponent  } from './containers/<%= singular(dasherize(name)) %>-new/<%= singular(dasherize(name)) %>-new.component';
import { <%= singular(classify(name)) %>EditComponent } from './containers/<%= singular(dasherize(name)) %>-edit/<%= singular(dasherize(name)) %>-edit.component';
import { <%= singular(classify(name)) %>CopyComponent } from './containers/<%= singular(dasherize(name)) %>-copy/<%= singular(dasherize(name)) %>-copy.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: <%= classify(name) %>ListComponent,  data: { title: '<%= classify(name) %> List'} },
  { path: 'new',  component: <%= singular(classify(name)) %>NewComponent,   data: { title: 'Create <%= singular(classify(name)) %>'} },
  { path: 'edit', component: <%= singular(classify(name)) %>EditComponent,  data: { title: 'Edit <%= singular(classify(name)) %> List'} },
  { path: 'copy', component: <%= singular(classify(name)) %>CopyComponent,  data: { title: 'Copy existing <%= singular(classify(name)) %> List'} }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class <%= classify(name) %>RoutingModule { }

