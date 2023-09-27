import {Section} from "./section.model";
import {Gender} from "./Gender.model";
import {Specialization} from "./Specialization.model";

export interface Teacher {
  id: number;
  email: string;
  password: string;
  name: string;
  specialization: Specialization;
  gender: Gender;
  joiningDate: Date;
  address: string;
  sections: Section[];
}
