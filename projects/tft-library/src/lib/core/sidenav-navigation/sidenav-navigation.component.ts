import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tft-sidenav-navigation',
  templateUrl: './sidenav-navigation.component.html',
  styleUrls: ['./sidenav-navigation.component.css']
})
export class SidenavNavigationComponent implements OnInit {

  @Input() links: { title: string, path: string, description?: string, subtitle?: string, icon?: string };
  @Output() itemClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  // want to allow any data to pass through here
  onItemClicked(item: any) {
    this.itemClicked.emit(item);
  }

}
