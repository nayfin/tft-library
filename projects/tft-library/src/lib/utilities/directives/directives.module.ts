import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const DIRECTIVES = [
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...DIRECTIVES
  ],
  exports: DIRECTIVES
})
export class DirectivesModule { }
