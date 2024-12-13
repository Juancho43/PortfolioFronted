import {Tag} from "./Tag";

export interface Proyecto{
  id: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  tags: Tag[];
}
