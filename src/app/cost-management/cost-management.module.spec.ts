import { CostManagementModule } from './cost-management.module';

describe('CostManagementModule', () => {
  let costManagementModule: CostManagementModule;

  beforeEach(() => {
    costManagementModule = new CostManagementModule();
  });

  it('should create an instance', () => {
    expect(costManagementModule).toBeTruthy();
  });
});
