import { Education } from '@model/Education';
import { faker } from '@faker-js/faker';
import { generateProjectMocks } from './projects.mock';
import { generateLinkMocks } from './link.mock';
import { generateTagMocks } from './tag.mock';

/**
 * Generates a mock Education object with optional partial data.
 * @param {Partial<Education>} data - Partial data to override the default mock values.
 * @returns {Education} - A mock Education object.
 */
export const educationMock = (data: Partial<Education>): Education => ({
  id: faker.number.int(),
  name: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  projects: generateProjectMocks(3, { deleted_at: null }),
  tags: generateTagMocks(3, { deleted_at: null }),
  links: generateLinkMocks(3, { deleted_at: null }),
  created_at: faker.date.past(),
  updated_at: faker.date.past(),
  deleted_at: faker.date.past(),
  ...data,
});

/**
 * Generates an array of mock Education objects.
 * @param {number} n - The number of mock Education objects to generate.
 * @param {Partial<Education>} data - Partial data to override the default mock values for each education.
 * @returns {Education[]} - An array of mock Education objects.
 */
export const generateEducationMocks = (n: number, data: Partial<Education>): Education[] => {
  return Array.from({ length: n }, () => educationMock({ ...data }));
};
