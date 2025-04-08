import { TestBed } from '@angular/core/testing';

import { LinkDaoService } from '@dao/link-dao.service';

describe('LinkDaoService', () => {
  let service: LinkDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
