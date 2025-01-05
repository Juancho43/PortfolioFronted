export interface Education {
  id: number;
  name : string;
  description : string;
  startDate : Date;
  endDate: Date;
  type : string;
  created_at : Date;
  updated_at : Date;
  deleted_at : Date | null;

}
