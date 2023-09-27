import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Grade} from "../models/grade.model";
import {GradeService} from "../services/grade.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {NewGradeComponent} from "../new-grade/new-grade.component";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit{
  grades: Grade[] = [];
  displayedColumns: string[] = ['ID', 'nameGrade', 'notes', 'actions'];
  dataSource : MatTableDataSource<Grade>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(public dialog: MatDialog,private gradeService: GradeService) {
    this.dataSource = new MatTableDataSource<Grade>();
  }

  ngOnInit(): void {
    this.loadGrades();
  }
  openAddEditGradeForm(){
    const dialogRef = this.dialog.open(NewGradeComponent);
    dialogRef.afterClosed().subscribe({
      next : value => {
        if(value){
          this.loadGrades();
        }
      }
    })
  }
  loadGrades(): void {
    this.gradeService.getAllGrades().subscribe(
      (resp) => {
        this.dataSource = new MatTableDataSource<Grade>(resp);
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
  openEditForm(data : Grade) {
    const dialogRef = this.dialog.open(NewGradeComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadGrades();
        }
      },
    });
  }
  deleteGrade(id : number) {
    this.gradeService.deleteGrade(id).subscribe({
      next: (res) => {
        // this._coreService.openSnackBar('Employee deleted!', 'done');
        this.loadGrades();
      },
      error: console.log,
    });
  }
}
