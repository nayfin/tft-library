import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './drop-zone.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';



const SHARED = [
  DropZoneDirective,
  FileUploadComponent
];

@NgModule({
  declarations: SHARED,
  exports: SHARED,
  imports: [
    CommonModule
  ],
})
export class FileUploadModule { }
