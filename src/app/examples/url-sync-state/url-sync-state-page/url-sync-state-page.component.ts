import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UrlSyncStateService } from '../url-sync-state.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export interface Item {
  id: string;
  title: string;
}

@Component({
  selector: 'app-url-sync-state-page',
  templateUrl: './url-sync-state-page.component.html',
  styleUrls: ['./url-sync-state-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrlSyncStatePageComponent implements OnInit {

  items: Item[] = [
    {
      id: 'asldkfa',
      title: 'cab'
    },
    {
      id: 'asldkfa',
      title: 'cabin'
    },
    {
      id: 'asldkfa',
      title: 'cabby'
    },
    {
      id: 'asldkfa',
      title: 'dab'
    },
    {
      id: 'asldkfa',
      title: 'grab'
    },
    {
      id: 'asldkfa',
      title: 'bald'
    },
    {
      id: 'asldkfa',
      title: 'robin'
    },
  ];

  filter$: Observable<any>;
  filteredItems$: Observable<Item[]>;

  constructor(
    private urlSync: UrlSyncStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.filter$ = this.urlSync.filter$;
    this.filteredItems$ = this.filter$.pipe(
      map((searchTerm) => {
        return this.items.filter(item => item.title.includes(searchTerm));
      })
    );
  }

  onSearched(term: string) {
    this.router.navigate([], {queryParams: {search: term}});
  }
}
