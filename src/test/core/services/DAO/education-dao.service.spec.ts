import {createServiceFactory, SpectatorService} from '@ngneat/spectator/jest';
import {EducationDaoService} from '@dao/education-dao.service';
import {generateEducationMocks, educationMock} from '@test/core/mocks/education.mock';

describe('EducationDaoService', () => {
  let spectator: SpectatorService<EducationDaoService>;
  const createService = createServiceFactory(EducationDaoService);

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should have a method that returns an empty object', () => {
    const emptyEducation = spectator.service.getEmptyEducation();
    expect(emptyEducation).toEqual({
      id: 0,
      name: '',
      description: '',
      startDate: new Date(0, 1, 1),
      endDate: new Date(0, 1, 1),
      created_at: new Date(0, 1, 1),
      updated_at : new Date(0, 1, 1),
      deleted_at : new Date(0, 1, 1),
    });
  });

  it('should have a behavior subject that returns an education', () => {
    const education = educationMock({});
    spectator.service.setEducation(education);
    spectator.service.getEducation().subscribe((data) => {
      expect(data).toEqual(education);
    });
  });

  it('should have a behavior subject that returns a list of educations', () => {
    const educations = generateEducationMocks(3, {});
    spectator.service.setEducations(educations);
    spectator.service.getEducations().subscribe((data) => {
      expect(data).toEqual(educations);
    });
  });

});
