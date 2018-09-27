import { NgModule } from '@angular/core';
import { CoreModule } from './core/public_api';
import { DesignModule } from './design/design.module';
import { DynamicFormModule } from 'tft-library/public_api';

@NgModule({
  imports: [
    CoreModule,
    DesignModule,
    DynamicFormModule
  ],
  exports: [
    CoreModule,
    DesignModule,
    DynamicFormModule
  ],
  declarations: []
})
export class TftLibraryModule { }
