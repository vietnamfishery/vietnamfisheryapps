import { ProfileManagementModule } from './profile-management.module';

describe('ProfileManagementModule', () => {
  let profileManagementModule: ProfileManagementModule;

  beforeEach(() => {
    profileManagementModule = new ProfileManagementModule();
  });

  it('should create an instance', () => {
    expect(profileManagementModule).toBeTruthy();
  });
});
