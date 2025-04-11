import { Project } from './Project';
import { Tag } from './Tag';
import { Link } from './Link';

export interface Education {
  id?: number;
  name: string;
  slug?: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  projects?: Project[];
  tags?: Tag[];
  links?: Link[];
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
