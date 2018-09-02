import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './examples/landing-page/landing-page.component';
import { AutocompleteChiplistComponent } from './examples/autocomplete-chiplist/autocomplete-chiplist.component';
import { DynamicFormComponent } from './examples/dynamic-form/dynamic-form.component';

const routes: Routes = [
  { path: ''    , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',                   component: LandingPageComponent },
  { path: 'autocomplete-chiplist',  component: AutocompleteChiplistComponent },
  { path: 'dynamic-form',  component: DynamicFormComponent },
  { path: '**'  , redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
