import { PondprepareManagementModule } from './pondprepare-management.module';

describe('PondprepareManagementModule', () => {
  let pondprepareManagementModule: PondprepareManagementModule;

  beforeEach(() => {
    pondprepareManagementModule = new PondprepareManagementModule();
  });

  it('should create an instance', () => {
    expect(pondprepareManagementModule).toBeTruthy();
  });
});
