import { TestBed } from '@angular/core/testing';

import { TablePagesService } from './table-pages.service';

describe('TablePagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TablePagesService = TestBed.get(TablePagesService);
    expect(service).toBeTruthy();
  });
});
