import { PondManagementModule } from './pond-management.module';

describe('PondManagementModule', () => {
  let pondManagementModule: PondManagementModule;

  beforeEach(() => {
    pondManagementModule = new PondManagementModule();
  });

  it('should create an instance', () => {
    expect(pondManagementModule).toBeTruthy();
  });
});
