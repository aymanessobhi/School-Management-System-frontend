import {Component, OnInit, ViewChild} from '@angular/core';
import {GradeService} from "../services/grade.service";
import {Grade} from "../models/grade.model";
import {SectionService} from "../services/section.service";
import {Section} from "../models/section.model";
import {NewOrEditSectionComponent} from "../new-or-edit-section/new-or-edit-section.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NewGradeComponent} from "../new-grade/new-grade.component";
import {T} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit{
  grades !: Grade[];
  sections !: Section[];
  displayedColumns: string[] = [
    'nameOfSection',
    'classroom',
    'status',
    'actions',
  ];
  dataSourceMap: { [gradeId: number]: MatTableDataSource<Section> } = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog,
              private gradeService : GradeService,
              private sectionService : SectionService) {
  }
  ngOnInit(): void {
    this.getAllGrades();
  }
  getAllGrades() {
    this.gradeService.getAllGrades().subscribe({
      next: (data) => {
        this.grades = data;
        // Fetch sections for each grade
        this.fetchSectionsForGrades();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchSectionsForGrades() {
    for (const grade of this.grades) {
      this.sectionService.getAllSectionsByGrade(grade.id).subscribe({
        next: (sections) => {
          grade.sections = sections;
          this.dataSourceMap[grade.id] = new MatTableDataSource(sections);
          this.dataSourceMap[grade.id].sort = this.sort;
          this.dataSourceMap[grade.id].paginator = this.paginator;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  deleteSection(id: number, gradeId: number) {
    const confirmation = confirm('Are you sure you want to delete this section?');
    if (confirmation) {
      this.sectionService.deleteSection(id).subscribe({
        next: () => {
          // Remove the deleted section from the data source
          this.dataSourceMap[gradeId].data = this.dataSourceMap[gradeId].data.filter(section => section.id !== id);
          this.getAllGrades();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  openAddEditSectionForm() {
    const dialogRef = this.dialog.open(NewOrEditSectionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllGrades();
        }
      },
    });
  }
  openEditForm(data : Section) {
    const dialogRef = this.dialog.open(NewOrEditSectionComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllGrades();
        }
      },
    });
  }

  applyFilter(grade: Grade, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMap[grade.id].filter = filterValue.trim().toLowerCase();
    this.dataSourceMap[grade.id].paginator?.firstPage();
  }

}
