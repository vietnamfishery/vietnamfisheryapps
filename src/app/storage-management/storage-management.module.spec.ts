import { StorageManagementModule } from './storage-management.module';

describe('StorageManagementModule', () => {
  let storageManagementModule: StorageManagementModule;

  beforeEach(() => {
    storageManagementModule = new StorageManagementModule();
  });

  it('should create an instance', () => {
    expect(storageManagementModule).toBeTruthy();
  });
});
