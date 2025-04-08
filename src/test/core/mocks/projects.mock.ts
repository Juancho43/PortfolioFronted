import { Project } from '@model/Project';
  import { faker } from '@faker-js/faker';
  import { generateLinkMocks } from './link.mock';
  import { generateTagMocks } from './tag.mock';

  /**
   * Generates a mock Project object with optional partial data.
   * @param {Partial<Project>} data - Partial data to override the default mock values.
   * @returns {Project} - A mock Project object.
   */
  export const projectMock = (data: Partial<Project>): Project => ({
    id: faker.number.int(),
    description: faker.lorem.sentence(),
    name: faker.lorem.words(2),
    links: generateLinkMocks(3, { deleted_at: null }),
    tags: generateTagMocks(3, { deleted_at: null }),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
    deleted_at: faker.date.past(),
    ...data
  });

  /**
   * Generates an array of mock Project objects.
   * @param {number} n - The number of mock Project objects to generate.
   * @param {Partial<Project>} data - Partial data to override the default mock values for each project.
   * @returns {Project[]} - An array of mock Project objects.
   */
  export const generateProjectMocks = (n: number, data: Partial<Project> ): Project[] => {
    return Array.from({ length: n }, () => projectMock( data));
  };
