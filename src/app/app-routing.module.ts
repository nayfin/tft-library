import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './examples/landing-page/landing-page.component';
import { AutocompleteChiplistComponent } from './examples/autocomplete-chiplist/autocomplete-chiplist.component';
import { MyDynamicFormComponent } from './examples/my-dynamic-form/my-dynamic-form.component';
import { UtilsComponent } from './examples/utils/utils.component';

const routes: Routes = [
  { path: ''    , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',                   component: LandingPageComponent },
  { path: 'autocomplete-chiplist',  component: AutocompleteChiplistComponent },
  { path: 'dynamic-form',           component: MyDynamicFormComponent },
  { path: 'utilities',              component: UtilsComponent },
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
