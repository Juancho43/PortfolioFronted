import { TestBed } from '@angular/core/testing';

import { ProfileDaoService } from '../../../../app/core/services/DAO/profile-dao.service';

describe('ProfileDaoService', () => {
  let service: ProfileDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
