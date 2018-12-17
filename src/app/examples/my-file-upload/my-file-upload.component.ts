import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-file-upload',
  templateUrl: './my-file-upload.component.html',
  styleUrls: ['./my-file-upload.component.scss']
})
export class MyFileUploadComponent implements OnInit, OnDestroy {

  downloadUrl: Observable<any>;
  subscriptions: Subscription[] = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe() );
  }
  handleDownloadComplete(downloadUrl: Observable<any>) {
    console.log('handleDownloadComplete');

    this.downloadUrl = downloadUrl;
    this.subscriptions.push(this.downloadUrl.subscribe( (downloadResponse) => console.log({downloadResponse})) );
  }

}
