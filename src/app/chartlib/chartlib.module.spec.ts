import { ChartlibModule } from './chartlib.module';

describe('ChartlibModule', () => {
  let chartlibModule: ChartlibModule;

  beforeEach(() => {
    chartlibModule = new ChartlibModule();
  });

  it('should create an instance', () => {
    expect(chartlibModule).toBeTruthy();
  });
});
