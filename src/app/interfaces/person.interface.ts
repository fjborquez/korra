import { PersonHousePivot } from "./person-house-pivot.interface";
import { User } from "./user.interface";

export interface Person {
  id: number;
  name: string;
  lastname: string;
  date_of_birth: string;
  pivot?: PersonHousePivot;
  user?: User;
}
