import { WasteManagementModule } from './waste-management.module';

describe('WasteManagementModule', () => {
  let wasteManagementModule: WasteManagementModule;

  beforeEach(() => {
    wasteManagementModule = new WasteManagementModule();
  });

  it('should create an instance', () => {
    expect(wasteManagementModule).toBeTruthy();
  });
});
