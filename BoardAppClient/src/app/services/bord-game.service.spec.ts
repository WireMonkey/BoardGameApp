import { TestBed } from '@angular/core/testing';

import { BordGameService } from './bord-game.service';

describe('BordGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BordGameService = TestBed.get(BordGameService);
    expect(service).toBeTruthy();
  });
});
