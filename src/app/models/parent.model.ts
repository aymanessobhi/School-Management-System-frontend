import {Nationality} from "./Nationality.model";
import {BloodType} from "./BloodType.model";
import {Religion} from "./religion.model";

export interface Parent {
  id: number;
  email: string;
  password: string;
  nameFather: string;
  nationalIdFather: string;
  passportIdFather: string;
  phoneFather: string;
  jobFather: string;
  nationalityFather: Nationality;
  bloodTypeFather: BloodType;
  religionFather: Religion;
  addressFather: string;
  nameMother: string;
  nationalIdMother: string;
  passportIdMother: string;
  phoneMother: string;
  jobMother: string;
  nationalityMother: Nationality;
  bloodTypeMother: BloodType;
  religionMother: Religion;
  addressMother: string;
  files: File[];
}
