import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';

const MODULES = [
  PipesModule,
  DirectivesModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: MODULES
})
export class UtilitiesModule { }
