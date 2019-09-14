import { TestBed, async, inject } from '@angular/core/testing';

import { ModGuard } from './mod.guard';

describe('ModGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModGuard]
    });
  });

  it('should ...', inject([ModGuard], (guard: ModGuard) => {
    expect(guard).toBeTruthy();
  }));
});
