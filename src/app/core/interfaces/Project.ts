import { Tag } from './Tag';
import { Link } from './Link';

export interface Project {
  id?: number;
  name: string;
  description: string;
  tags?: Tag[];
  links?: Link[];
  created_at?: Date | null;
  updated_at?: Date | null;
  delete_at?: Date | null;
}
