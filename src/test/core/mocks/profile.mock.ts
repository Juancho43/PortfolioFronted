import { Profile } from '@model/Profile';
import { faker } from '@faker-js/faker';
import {generateLinkMocks} from './link.mock';

/**
 * Generates a mock Profile object with optional partial data.
 * @param {Partial<Profile>} data - Partial data to override the default mock values.
 * @returns {Profile} - A mock Profile object.
 */
export const profileMock = (data: Partial<Profile>): Profile => ({
  id: faker.number.int(),
  user_id: faker.number.int(),
  name: faker.lorem.words(2),
  rol: faker.lorem.word(1),
  description: faker.lorem.sentence(10),
  links: generateLinkMocks(3, {deleted_at : null}),
  created_at: faker.date.past(),
  updated_at: faker.date.past(),
  deleted_at: faker.date.past(),
  ...data
});

/**
 * Generates an array of mock Profile objects.
 * @param {number} n - The number of mock Profile objects to generate.
 * @param {Partial<Profile>} data - Partial data to override the default mock values for each profile.
 * @returns {Profile[]} - An array of mock Profile objects.
 */
export const generateProfileMocks = (n: number, data: Partial<Profile>): Profile[] => {
  return Array.from({ length: n }, () => profileMock({ ...data }));
};
