export interface Tag{
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  pivot?: {
    proyect_id: number,
    tags_id: number,
  }
}
