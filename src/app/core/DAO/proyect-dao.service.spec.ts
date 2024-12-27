import { TestBed } from '@angular/core/testing';

import { ProyectDaoService } from './proyect-dao.service';

describe('ProyectDaoService', () => {
  let service: ProyectDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
