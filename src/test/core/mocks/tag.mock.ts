import { Tag } from '@model/Tag';
import { faker } from '@faker-js/faker';

/**
 * Generates a mock Tag object with optional partial data.
 * @param {Partial<Tag>} data - Partial data to override the default mock values.
 * @returns {Tag} - A mock Tag object.
 */
export const tagMock = (data: Partial<Tag>): Tag => ({
  id: faker.number.int(),
  name: faker.lorem.word(),
  created_at: faker.date.past(),
  updated_at: faker.date.past(),
  deleted_at: faker.date.past(),
  ...data,
});

/**
 * Generates an array of mock Tag objects.
 * @param {number} n - The number of mock Tag objects to generate.
 * @param {Partial<Tag>} data - Partial data to override the default mock values for each tag.
 * @returns {Tag[]} - An array of mock Tag objects.
 */
export const generateTagMocks = (n: number, data: Partial<Tag>): Tag[] => {
  return Array.from({ length: n }, () => tagMock({ ...data }));
};
