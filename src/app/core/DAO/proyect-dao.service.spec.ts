import { TestBed } from '@angular/core/testing';

import { ProjectDaoService } from './project-dao.service';

describe('ProyectDaoService', () => {
  let service: ProjectDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
