import {Project} from '../../../app/core/interfaces/Project';
import {faker} from '@faker-js/faker';

export const mockProjects: Project[] = [
  { description: 'Project 1', name: 'Project 1' },
  { description: 'Project 2', name: 'Project 2' },
];

export const mockProject= (data : Partial<Project>) : Project =>({
  id: faker.number.int(),
  description: faker.lorem.sentence(),
  name: faker.lorem.words(2),
  ...data
});


