import { Component, OnInit, Output, OnDestroy, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-url-sync-state-filter',
  templateUrl: './url-sync-state-filter.component.html',
  styleUrls: ['./url-sync-state-filter.component.scss']
})
export class UrlSyncStateFilterComponent implements OnInit, OnDestroy {

  @Output() searched = new EventEmitter();
  @Input() searchTerm: string;
  control: FormControl;
  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.control = new FormControl(this.searchTerm);
    this.subs.push(
      this.control.valueChanges.pipe(
        debounceTime(300),
        tap(text => {
          console.log(text);
          this.searched.emit(text);
        })
      ).subscribe(),
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe);
  }

}
