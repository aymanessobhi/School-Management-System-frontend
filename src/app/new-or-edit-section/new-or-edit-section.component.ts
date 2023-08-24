import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Grade} from "../models/grade.model";
import {Classroom} from "../models/classroom.model";
import {GradeService} from "../services/grade.service";
import {SectionService} from "../services/section.service";
import {ClassroomService} from "../services/classroom.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Section} from "../models/section.model";
import {Observable, switchMap} from "rxjs";
import {MatSelectChange} from "@angular/material/select";
import {trigger} from "@angular/animations";

@Component({
  selector: 'app-new-or-edit-section',
  templateUrl: './new-or-edit-section.component.html',
  styleUrls: ['./new-or-edit-section.component.css']
})
export class NewOrEditSectionComponent implements OnInit{
  formSections !: FormGroup;
  grades : Grade[] = [];
  classrooms: Classroom[] = [];
  sections :Section[]=[];
  selectedGrade !: any[];

  constructor(private classroomService: ClassroomService,
              private gradeService : GradeService,
              private sectionService : SectionService,
              private fb : FormBuilder,
              private dialogRef : MatDialogRef<NewOrEditSectionComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any
              ) {
    this.formSections = this.fb.group({
      name_section : this.fb.control(''),
      grade : this.fb.control(null),
      myClass : this.fb.control(null)
    })

  }

  ngOnInit(): void {
    this.loadGrades();
  }

  onFormSubmit() {
    if (this.formSections.valid) {
      const sectionData = this.formSections.value;

      // Convert the grade and myClass IDs to objects with the expected structure
      sectionData.grade = { id: sectionData.grade };
      sectionData.myClass = { id: sectionData.myClass };

      if (this.data) {
        this.sectionService.updateSection(this.data.id, sectionData)
          .subscribe({
            next: (val: any) => {
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.sectionService.createSection(sectionData).subscribe({
          next: (val: any) => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  private loadGrades() {
    this.gradeService.getAllGrades().subscribe(
      (grades) => {
        this.grades = grades;
      },
      (error) => {
        console.error('Error loading grades:', error);
      }
    );
  }
  private loadClassroomsByGradeId(gradeId: number) {
    this.classroomService.getAllClassroomsByGradeId(gradeId).subscribe(
      (classrooms) => {
        this.classrooms = classrooms;
      },
      (error) => {
        console.error('Error loading classrooms:', error);
      }
    );
  }
  selectedType(trigger: MatSelectChange) {
    const selectedGradeId = +trigger.value;
    this.loadClassroomsByGradeId(selectedGradeId);
  }
}
