import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClassroomService} from "../services/classroom.service";
import {Grade} from "../models/grade.model";
import {GradeComponent} from "../grade/grade.component";
import {GradeService} from "../services/grade.service";

@Component({
  selector: 'app-new-or-edit-classroom',
  templateUrl: './new-or-edit-classroom.component.html',
  styleUrls: ['./new-or-edit-classroom.component.css']
})
export class NewOrEditClassroomComponent implements OnInit{
  formClassrooms !: FormGroup ;
  grades: Grade[] = [];
  constructor(
    private classroomService: ClassroomService, private gradeService : GradeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewOrEditClassroomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formClassrooms = this.fb.group({
      nameOfClass: '',
      grade: null,
    });
  }

  ngOnInit(): void {
    this.loadGrades();
  }

  onFormSubmit() {
    if (this.formClassrooms.valid) {
      if (this.data) {
        this.classroomService.updateClassroom(this.data.id, this.formClassrooms.value)
          .subscribe({
            next: () => {
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            }
          });
      } else {
        this.classroomService.saveClassroom(this.formClassrooms.value).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    }
  }
  loadGrades() {
    this.gradeService.getAllGrades().subscribe(
      (grades) => {
        this.grades = grades;
      },
      (error) => {
        console.error('Error loading grades:', error);
      }
    );
  }

  removeClassroomGroup(i: any) {

  }

  addClassroomGroup() {

  }
}
