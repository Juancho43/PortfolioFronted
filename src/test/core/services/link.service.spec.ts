import { TestBed } from '@angular/core/testing';

import { LinkService } from '@services/http/link.service';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
