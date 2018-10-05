import { TestBed } from '@angular/core/testing';

import { EmployeesManagementService } from './employees-management.service';

describe('EmployeesManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeesManagementService = TestBed.get(EmployeesManagementService);
    expect(service).toBeTruthy();
  });
});
