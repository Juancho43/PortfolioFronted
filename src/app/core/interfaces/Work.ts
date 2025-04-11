import { Link } from './Link';
import { Tag } from './Tag';

export interface Work {
  id?: number;
  name?: string;
  slug?: string;
  company: string;
  position: string;
  start_date: Date;
  end_date?: Date;
  responsibilities?: string;
  links?: Link[];
  tags?: Tag[];
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
