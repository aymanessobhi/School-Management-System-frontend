import {Grade} from "./grade.model";

export interface Classroom {
  id: number;
  nameOfClass: string;
  grade: Grade;
}
