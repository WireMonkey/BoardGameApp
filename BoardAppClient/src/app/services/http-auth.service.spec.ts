import { TestBed } from '@angular/core/testing';

import { HttpAuthService } from './http-auth.service';

describe('HttpAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpAuthService = TestBed.get(HttpAuthService);
    expect(service).toBeTruthy();
  });
});
