import { TestBed, inject } from '@angular/core/testing';

import { KaraokempService } from './karaokemp.service';

describe('KaraokempService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KaraokempService]
    });
  });

  it('should be created', inject([KaraokempService], (service: KaraokempService) => {
    expect(service).toBeTruthy();
  }));
});
