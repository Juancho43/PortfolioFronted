import { Link } from '@model/Link';
import { faker } from '@faker-js/faker';

/**
 * Generates a mock Link object with optional partial data.
 * @param {Partial<Link>} data - Partial data to override the default mock values.
 * @returns {Link} - A mock Link object.
 */
export const linkMock = (data: Partial<Link>): Link => ({
  id: faker.number.int(),
  name: faker.lorem.word(),
  link: faker.internet.url(),
  created_at: faker.date.past(),
  updated_at: faker.date.past(),
  deleted_at: faker.date.past(),
  ...data
});

/**
 * Generates an array of mock Link objects.
 * @param {number} n - The number of mock Link objects to generate.
 * @param {Partial<Link>} data - Partial data to override the default mock values for each link.
 * @returns {Link[]} - An array of mock Link objects.
 */
export const generateLinkMocks = (n: number, data: Partial<Link>): Link[] => {
  return Array.from({ length: n }, () => linkMock({ ...data }));
};
