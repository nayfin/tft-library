import { NgModule } from '@angular/core';
import { CoreModule } from './core/public_api';

import { DesignModule } from './design/design.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ValidationHandlingModule } from './validation-handling/validation-handling.module';

const MODULES = [
  CoreModule,
  DesignModule,
  DynamicFormModule,
  ValidationHandlingModule,
  UtilitiesModule,
  FileUploadModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class TftLibraryModule { }
