import { TestBed } from '@angular/core/testing';

import { EducationDaoService } from './education-dao.service';

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
