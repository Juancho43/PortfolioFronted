import {Tag} from "./Tag";

export interface Proyecto {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  tags: Tag[];
}
