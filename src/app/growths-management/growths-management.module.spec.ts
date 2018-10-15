import { GrowthsManagementModule } from './growths-management.module';

describe('GrowthsManagementModule', () => {
  let growthsManagementModule: GrowthsManagementModule;

  beforeEach(() => {
    growthsManagementModule = new GrowthsManagementModule();
  });

  it('should create an instance', () => {
    expect(growthsManagementModule).toBeTruthy();
  });
});
