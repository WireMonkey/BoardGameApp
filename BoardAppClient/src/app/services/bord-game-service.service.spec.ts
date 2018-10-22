import { TestBed } from '@angular/core/testing';

import { BordGameServiceService } from './bord-game-service.service';

describe('BordGameServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BordGameServiceService = TestBed.get(BordGameServiceService);
    expect(service).toBeTruthy();
  });
});
