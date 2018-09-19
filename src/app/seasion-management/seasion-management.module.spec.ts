import { SeasionManagementModule } from './seasion-management.module';

describe('SeasionManagementModule', () => {
  let seasionManagementModule: SeasionManagementModule;

  beforeEach(() => {
    seasionManagementModule = new SeasionManagementModule();
  });

  it('should create an instance', () => {
    expect(seasionManagementModule).toBeTruthy();
  });
});
