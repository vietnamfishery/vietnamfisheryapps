import { PondPrepareManagementModule } from './pond-prepare-management.module';

describe('PondPrepareManagementModule', () => {
  let pondPrepareManagementModule: PondPrepareManagementModule;

  beforeEach(() => {
    pondPrepareManagementModule = new PondPrepareManagementModule();
  });

  it('should create an instance', () => {
    expect(pondPrepareManagementModule).toBeTruthy();
  });
});
