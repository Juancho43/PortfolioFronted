import { TestBed } from '@angular/core/testing';

import { EducationDaoService } from '../../../../app/core/services/DAO/education-dao.service';

describe('EducationDaoService', () => {
  let service: EducationDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
