import { Link } from './Link';

export interface Profile {
  id?: number;
  name: string;
  rol: string;
  description: string;
  user_id?: number;
  links?: Link[];
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
