import { DragndropModule } from './dragndrop.module';

describe('DragndropModule', () => {
  let dragndropModule: DragndropModule;

  beforeEach(() => {
    dragndropModule = new DragndropModule();
  });

  it('should create an instance', () => {
    expect(dragndropModule).toBeTruthy();
  });
});
