import {createServiceFactory, SpectatorService} from '@ngneat/spectator/jest';
import {ProjectDaoService} from '@dao/project-dao.service';
import {generateProjectMocks, projectMock} from '@test/core/mocks/projects.mock';

describe('ProjectDaoService', () => {
  let spectator: SpectatorService<ProjectDaoService>;
  const createService = createServiceFactory(ProjectDaoService);

  beforeEach (() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should have a method that returns an empty object', () => {
    const emptyProject = spectator.service.getEmptyProject();
    expect(emptyProject).toEqual({
      description: '',
      name: '',
    });
  });

  it('should have a behavior subject that returns a project', () => {
    const project = projectMock({});
    spectator.service.setProject(project);
    spectator.service.getProject().subscribe((data) => {
      expect(data).toEqual(project);
    });
  })

  it('should have a behavior subject that returns a list of projects', () => {
      const projects = generateProjectMocks(3, {});
      spectator.service.setProjects(projects);
      spectator.service.getProjects().subscribe((data) => {
        expect(data).toEqual(projects);
      });
    },
  );

})
