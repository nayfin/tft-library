import { Component, OnInit, Input } from '@angular/core';

// TODO: Find a better way of storing this, once it is needed in other places
// tslint:disable-next-line:max-line-length
const ALGOLIA_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/bigharvest-1046.appspot.com/o/algolia.png?alt=media&token=d2c9f6c4-21f5-49d7-8f79-1206e38aa8bd';

@Component({
  selector: 'tft-algolia-attribution',
  templateUrl: './algolia-attribution.component.html',
  styleUrls: ['./algolia-attribution.component.scss']
})


export class AlgoliaAttributionComponent implements OnInit {

  @Input() public algoliaLogoUrl = ALGOLIA_LOGO_URL;

  constructor() { }

  ngOnInit() {
  }

}
