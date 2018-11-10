import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './drop-zone.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    DropZoneDirective,
    FileUploadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FileUploadModule { }
