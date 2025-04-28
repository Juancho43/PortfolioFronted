import { Work } from '@model/Work';
import { faker } from '@faker-js/faker';
import { generateTagMocks } from './tag.mock';
import { generateLinkMocks } from './link.mock';

/**
 * Generates a mock Work object with optional partial data.
 * @param {Partial<Work>} data - Partial data to override the default mock values.
 * @returns {Work} - A mock Work object.
 */
export const workMock = (data: Partial<Work>): Work => ({
  id: faker.number.int(),
  company: faker.lorem.words(2),
  position: faker.lorem.word(),
  responsibilities: faker.lorem.paragraph(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  tags: generateTagMocks(3, { deleted_at: null }),
  links: generateLinkMocks(3, { deleted_at: null }),
  created_at: faker.date.past(),
  updated_at: faker.date.past(),
  deleted_at: faker.date.past(),
  ...data,
});

/**
 * Generates an array of mock Work objects.
 * @param {number} n - The number of mock Work objects to generate.
 * @param {Partial<Work>} data - Partial data to override the default mock values for each work.
 * @returns {Work[]} - An array of mock Work objects.
 */
export const generateWorkMocks = (n: number, data: Partial<Work>): Work[] => {
  return Array.from({ length: n }, () => workMock({ ...data }));
};
