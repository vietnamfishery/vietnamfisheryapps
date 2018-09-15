import { TaskboardModule } from './taskboard.module';

describe('TaskboardModule', () => {
  let taskboardModule: TaskboardModule;

  beforeEach(() => {
    taskboardModule = new TaskboardModule();
  });

  it('should create an instance', () => {
    expect(taskboardModule).toBeTruthy();
  });
});
