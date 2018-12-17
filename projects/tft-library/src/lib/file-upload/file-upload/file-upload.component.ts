import { Component, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';

import { Observable, Subscription } from 'rxjs';
import { finalize, tap, map, switchMap } from 'rxjs/operators';

export enum ImageQuality {
  THUMBNAIL = '48',
  LOW = '256',
  MED = '512',
  HIGH = '1024'
}

@Component({
  selector: 'tft-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnDestroy {

  @Input() rootPath = 'undefined/';
  @Input() expectCompression = false;
  @Input() quality: ImageQuality | string | null = null;

  @Output() uploadComplete = new EventEmitter<Observable<string>>();
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage$: Observable<number>;

  snapshot$: Observable<any>;

  // Download URL
  downloadURL$: Observable<any>;

  subscriptions: Subscription[] = [];
  // State for dropzone CSS toggling
  isHovering: boolean;
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
  ) { }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      this.snackBar.open('Unsupported file type');
      return;
    }

    // The storage path
    // TODO: this should be an input
    const path = `${this.rootPath}/${file.name}`;

    // You can pass image compression quality if you backend is set up to compress
    const customMetadata = { quality: this.quality };

    // The main task
    this.task = this.storage.upload(path, file, {customMetadata});
    console.log({task: this.task});

    // Progress monitoring
    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges();

    // The file's download URL
    this.subscriptions.push(
      this.task.snapshotChanges().pipe(
        tap( (snap) => console.log({snap})),
        finalize(() => {
          this.downloadURL$ = this.storage.ref(path).getDownloadURL();
          this.uploadComplete.emit(this.downloadURL$);
        }),
      ).subscribe()
    );
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
