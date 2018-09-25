import { EmployeesManagementModule } from './employees-management.module';

describe('EmployeesManagementModule', () => {
  let employeesManagementModule: EmployeesManagementModule;

  beforeEach(() => {
    employeesManagementModule = new EmployeesManagementModule();
  });

  it('should create an instance', () => {
    expect(employeesManagementModule).toBeTruthy();
  });
});
