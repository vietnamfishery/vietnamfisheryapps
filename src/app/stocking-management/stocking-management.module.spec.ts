import { StockingManagementModule } from './stocking-management.module';

describe('StockingManagementModule', () => {
  let stockingManagementModule: StockingManagementModule;

  beforeEach(() => {
    stockingManagementModule = new StockingManagementModule();
  });

  it('should create an instance', () => {
    expect(stockingManagementModule).toBeTruthy();
  });
});
