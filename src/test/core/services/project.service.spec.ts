import {createHttpFactory, HttpMethod, SpectatorHttp} from '@ngneat/spectator/jest';
import {ProjectService} from '@services/project.service';
import {environment} from '@environments/environment';

describe('ProjectService', () => {
  let spectator: SpectatorHttp<ProjectService>;
  const createService = createHttpFactory(ProjectService);

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    spectator.service.getAll().subscribe((data) => {
    })
    const url = `${environment.api_url}/project`;
    spectator.expectOne(url, HttpMethod.GET);
  });


});
