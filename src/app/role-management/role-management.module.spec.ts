import { RoleManagementModule } from './role-management.module';

describe('RoleManagementModule', () => {
  let roleManagementModule: RoleManagementModule;

  beforeEach(() => {
    roleManagementModule = new RoleManagementModule();
  });

  it('should create an instance', () => {
    expect(roleManagementModule).toBeTruthy();
  });
});
