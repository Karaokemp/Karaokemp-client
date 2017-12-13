import { TestBed, inject } from '@angular/core/testing';

import { SelectSongGuard } from './select-song.guard';

describe('SelectSongGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectSongGuard]
    });
  });

  it('should be created', inject([SelectSongGuard], (service: SelectSongGuard) => {
    expect(service).toBeTruthy();
  }));
});
