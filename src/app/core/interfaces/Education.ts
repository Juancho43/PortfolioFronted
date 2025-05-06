import { Project } from './Project';
import { Tag } from './Tag';
import { Link } from './Link';

export interface Education {
  id?: number;
  name: string;
  slug?: string;
  description: string;
  start_date: Date;
  end_date?: Date;
  projects?: Project[];
  tags?: Tag[];
  links?: Link[];
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
