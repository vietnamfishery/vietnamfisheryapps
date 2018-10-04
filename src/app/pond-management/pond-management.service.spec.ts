import { TestBed } from '@angular/core/testing';

import { PondManagementService } from './pond-management.service';

describe('PondManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PondManagementService = TestBed.get(PondManagementService);
    expect(service).toBeTruthy();
  });
});
