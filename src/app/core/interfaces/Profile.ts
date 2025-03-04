import { Link } from "./Link";

export interface Profile {
  id: number;
  name: string;
  rol: string;
  description: string;
  links : Link[];
}
