import { City } from "./city.interface";
import { Person } from "./person.interface";

export interface House {
  id: number;
  description: string;
  is_active: number;
  city: City;
  persons: Person[];
}
