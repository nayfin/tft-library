import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-url-sync-state-item',
  templateUrl: './url-sync-state-item.component.html',
  styleUrls: ['./url-sync-state-item.component.scss']
})
export class UrlSyncStateItemComponent implements OnInit {

  @Input() item: number;

  constructor() { }

  ngOnInit() {
  }

}
