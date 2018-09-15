import { TablePagesModule } from './table-pages.module';

describe('TablePagesModule', () => {
  let tablePagesModule: TablePagesModule;

  beforeEach(() => {
    tablePagesModule = new TablePagesModule();
  });

  it('should create an instance', () => {
    expect(tablePagesModule).toBeTruthy();
  });
});
