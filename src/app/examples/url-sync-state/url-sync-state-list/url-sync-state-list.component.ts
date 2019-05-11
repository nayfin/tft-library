import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-url-sync-state-list',
  templateUrl: './url-sync-state-list.component.html',
  styleUrls: ['./url-sync-state-list.component.scss']
})
export class UrlSyncStateListComponent implements OnInit {

  @Input() items: any[];

  constructor() { }

  ngOnInit() {
  }

}
