import { TestBed } from '@angular/core/testing';

import { WorkDaoService } from '@dao/work-dao.service';

describe('WorkDaoService', () => {
  let service: WorkDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
