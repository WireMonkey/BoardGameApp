import { TestBed } from '@angular/core/testing';

import { HttpUnAuthService } from './http-un-auth.service';

describe('HttpUnAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpUnAuthService = TestBed.get(HttpUnAuthService);
    expect(service).toBeTruthy();
  });
});
