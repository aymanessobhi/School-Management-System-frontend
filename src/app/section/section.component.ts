import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SectionService } from '../services/section.service';
import { GradeService } from '../services/grade.service';
import { Grade } from '../models/grade.model';
import { Section } from '../models/section.model';
import { NewOrEditSectionComponent } from '../new-or-edit-section/new-or-edit-section.component';
import {Classroom} from "../models/classroom.model";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit {
  sections: Section[] = [];
  grades: Grade[] = [];
  classrooms: Classroom[] = [];
  sectionsByGrade: { grade: Grade, sections: Section[] }[] = [];
  selectedSectionIds: number[] = [];
  displayedColumns: string[] = [
    'ID',
    'nameOfSection',
    'classroom',
    'actions',
  ];
  dataSource: MatTableDataSource<Section>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private sectionService: SectionService,
    private gradeService: GradeService
  ) {
    this.dataSource = new MatTableDataSource<Section>();
  }

  ngOnInit(): void {
    this.loadSections();
    this.loadGrades();
  }

  private loadSections() {
    this.sectionService.getSections().subscribe(
      (resp) => {
        this.sections = resp;
        this.dataSource = new MatTableDataSource<Section>(resp);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error loading sections:', error);
      }
    );
  }

  openAddEditSectionForm() {
    const dialogRef = this.dialog.open(NewOrEditSectionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadSections();
        }
      },
    });
  }

  deleteSelectedSections() {
    // Implement the delete functionality
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditForm(row: any) {
    // Implement the edit functionality
  }

  deleteSection(id: any) {
    // Implement the delete section functionality
  }

  loadGrades() {
    this.gradeService.getAllGrades().subscribe(
      (grades) => {
        this.grades = grades;
        console.log(this.groupSectionsByGrade());
        this.sectionsByGrade = this.groupSectionsByGrade();
      },
      (error) => {
        console.error('Error loading grades:', error);
      }
    );
  }

  // Group sections by grade
  groupSectionsByGrade(): { grade: Grade; sections: Section[] }[] {
    const sectionsByGrade: { grade: Grade; sections: Section[] }[] = [];
    this.grades.forEach((grade) => {
      const sectionsForGrade = this.sections.filter(
        (section) => section.grade.id === grade.id
      );
      sectionsByGrade.push({ grade, sections: sectionsForGrade });
    });
    console.log(this.sectionsByGrade);
    return sectionsByGrade;
  }
}
