import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs/Observable';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'tft-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() rootPath = 'undefined/';
  @Output() uploadComplete = new EventEmitter<Observable<string>>();
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage$: Observable<number>;

  snapshot$: Observable<any>;

  // Download URL
  downloadURL$: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    // TODO: this should be an input
    const path = `${this.rootPath}/${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges();

    // The file's download URL
    this.task.snapshotChanges().pipe(
      tap( (snap) => console.log({snap})),
      finalize(() => {
        this.downloadURL$ = this.storage.ref(path).getDownloadURL();
        this.uploadComplete.emit(this.downloadURL$);
      })
    );
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
