import {Grade} from "./grade.model";
import {Classroom} from "./classroom.model";
import {Teacher} from "./Teacher.model";

export interface Section {
  id: number,
  name_section: string,
  grade: Grade,
  myClass: Classroom,
  status: string,
  teachers: Teacher[];
}
