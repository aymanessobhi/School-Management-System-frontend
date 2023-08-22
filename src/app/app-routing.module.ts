import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StudentComponent} from "./student/student.component";
import {HomeComponent} from "./components/home/home.component";
import {GradeComponent} from "./grade/grade.component";
import {NewGradeComponent} from "./new-grade/new-grade.component";


let routes : Routes = [
  {path : 'student',component : StudentComponent},
  { path: 'home', component: HomeComponent },
  // { path: 'attendance', component: AttendanceListComponent },
  // { path: 'classrooms', component: ClassroomListComponent },
  // { path: 'genders', component: GenderListComponent },
  { path: 'grades', component: GradeComponent },
  { path: 'new-grade', component: NewGradeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
