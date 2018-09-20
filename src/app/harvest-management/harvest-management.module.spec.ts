import { HarvestManagementModule } from './harvest-management.module';

describe('HarvestManagementModule', () => {
  let harvestManagementModule: HarvestManagementModule;

  beforeEach(() => {
    harvestManagementModule = new HarvestManagementModule();
  });

  it('should create an instance', () => {
    expect(harvestManagementModule).toBeTruthy();
  });
});
