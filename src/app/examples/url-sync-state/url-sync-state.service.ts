import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlSyncStateService {

  public filter$: Observable<string>;

  constructor(
    private route: ActivatedRoute
  ) {
    this.filter$ = route.queryParamMap.pipe(
      tap(console.log),
      map((params: ParamMap) => {
        return params.get('search');
      })
    );
  }

}
