import { TestBed } from '@angular/core/testing';

import { UrlSyncStateService } from './url-sync-state.service';

describe('UrlSyncStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlSyncStateService = TestBed.get(UrlSyncStateService);
    expect(service).toBeTruthy();
  });
});
