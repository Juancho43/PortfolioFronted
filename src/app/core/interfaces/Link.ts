export interface Link {
  id?: number;
  name: string;
  link: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
