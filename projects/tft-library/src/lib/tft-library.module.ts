import { NgModule } from '@angular/core';
import { TftLibraryComponent } from './tft-library.component';
import { CoreModule } from './core/public_api';
import { DesignModule } from './design/design.module';

@NgModule({
  imports: [
    CoreModule,
    DesignModule
  ],
  exports: [
    TftLibraryComponent,
    CoreModule,
    DesignModule
  ]
})
export class TftLibraryModule { }
