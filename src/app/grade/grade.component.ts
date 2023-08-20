import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Grade} from "../models/grade.model";
import {GradeService} from "../services/grade.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit,AfterViewInit {
  grades: Grade[] = [];

  displayedColumns: string[] = ['ID', 'nameGrade', 'notes', 'actions'];
  dataSource : MatTableDataSource<Grade>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(public dialog: MatDialog,private gradeService: GradeService) {
    this.dataSource = new MatTableDataSource<Grade>();
  }

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.gradeService.getAllGrades().subscribe(
      (grades) => {
        this.grades = grades;
        this.dataSource.data = this.grades;
      },
      (error) => {
        console.error('Error loading grades:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  addGrade() {

  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
