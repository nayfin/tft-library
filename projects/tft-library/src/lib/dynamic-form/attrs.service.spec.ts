import { TestBed, inject } from '@angular/core/testing';

import { AttrsService } from './attrs.service';

describe('AttrsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttrsService]
    });
  });

  it('should be created', inject([AttrsService], (service: AttrsService) => {
    expect(service).toBeTruthy();
  }));
});
