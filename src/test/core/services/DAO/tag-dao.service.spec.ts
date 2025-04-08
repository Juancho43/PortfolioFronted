import { TestBed } from '@angular/core/testing';

import { TagDaoService } from '@dao/tag-dao.service';

describe('TagDaoService', () => {
  let service: TagDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
