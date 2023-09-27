import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Teacher} from "../models/Teacher.model";
import {TeacherService} from "../services/teacher.service";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit{
  teachers: Teacher[] = [];
  displayedColumns: string[] = ['ID', 'name', 'specialization', 'gender','joiningDate','address','actions'];

  dataSource : MatTableDataSource<Teacher>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(public dialog: MatDialog,private teacherService: TeacherService) {
    this.dataSource = new MatTableDataSource<Teacher>();
  }
  ngOnInit(): void {
    this.loadTeachers();
  }
  private loadTeachers() {
    this.teacherService.getAllTeachers().subscribe(
      (resp) => {
        this.dataSource = new MatTableDataSource<Teacher>(resp);
        this.dataSource.sort =this.sort;
        this.dataSource.paginator =this.paginator;
      },
      (error) => {
        console.error('Error loading grades:', error);
      }
    );
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  deleteGrade(id : number) {
    this.teacherService.deleteTeacher(id).subscribe({
      next: (res) => {
        // this._coreService.openSnackBar('Employee deleted!', 'done');
        this.loadTeachers();
      },
      error: console.log,
    });
  }

  openAddEditGradeForm() {

  }

  openEditForm(row: number) {

  }
}
