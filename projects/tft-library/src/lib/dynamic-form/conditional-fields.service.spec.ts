import { TestBed, inject } from '@angular/core/testing';

import { ConditionalFieldsService } from './conditional-fields.service';

describe('ConditionalFieldsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConditionalFieldsService]
    });
  });

  it('should be created', inject([ConditionalFieldsService], (service: ConditionalFieldsService) => {
    expect(service).toBeTruthy();
  }));
});
