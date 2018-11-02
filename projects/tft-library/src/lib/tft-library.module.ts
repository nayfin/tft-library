import { NgModule } from '@angular/core';
import { CoreModule } from './core/public_api';
import { DesignModule } from './design/design.module';
import { DynamicFormModule } from 'tft-library/public_api';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    CoreModule,
    DesignModule,
    DynamicFormModule,
    PipesModule
  ],
  exports: [
    CoreModule,
    DesignModule,
    DynamicFormModule,
    PipesModule
  ],
  declarations: []
})
export class TftLibraryModule { }
