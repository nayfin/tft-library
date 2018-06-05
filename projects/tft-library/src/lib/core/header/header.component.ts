import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'tft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuClicked = new EventEmitter<void>();

  @Input() title = 'Tortilla Flat Tech';
  @Input() subtitle;

  constructor() { }

  ngOnInit() {
  }

  onMenuClicked() {
    this.menuClicked.emit();
  }
}
