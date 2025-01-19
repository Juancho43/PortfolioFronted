export interface Education {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: string;
  profile_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
