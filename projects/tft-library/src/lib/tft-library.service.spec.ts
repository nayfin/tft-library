import { TestBed, inject } from '@angular/core/testing';

import { TftLibraryService } from './tft-library.service';

describe('TftLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TftLibraryService]
    });
  });

  it('should be created', inject([TftLibraryService], (service: TftLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
