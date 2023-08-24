import {Section} from "./section.model";

export interface Grade{
  id : number,
  nameGrade : string,
  notes : string
  sections?:Array<Section>
}
