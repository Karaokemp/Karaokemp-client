import { TestBed, inject } from '@angular/core/testing';

import { PersistencyService } from './persistency.service';

describe('PersistencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistencyService]
    });
  });

  it('should be created', inject([PersistencyService], (service: PersistencyService) => {
    expect(service).toBeTruthy();
  }));
});
