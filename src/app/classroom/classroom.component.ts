import { Component, OnInit, ViewChild } from '@angular/core';
import { Classroom } from "../models/classroom.model";
import { ClassroomService } from "../services/classroom.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import {NewOrEditClassroomComponent} from "../new-or-edit-classroom/new-or-edit-classroom.component";
import {MatCheckboxChange} from "@angular/material/checkbox";
//import { NewClassroomComponent } from "../new-classroom/new-classroom.component"; // Replace with the actual component

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  classrooms: Classroom[] = [];
  selectedClassroomIds: number[] = [];
  displayedColumns: string[] = ['select','ID', 'nameOfClass', 'grade', 'actions'];
  dataSource: MatTableDataSource<Classroom>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private classroomService: ClassroomService) {
    this.dataSource = new MatTableDataSource<Classroom>();
  }

  ngOnInit(): void {
    this.loadClassrooms();
  }

  openAddEditClassroomForm() {
    const dialogRef = this.dialog.open(NewOrEditClassroomComponent);
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value) {
          this.loadClassrooms();
        }
      }
    })
  }

  loadClassrooms(): void {
    this.classroomService.getAllClassrooms().subscribe(
      (resp) => {
        this.dataSource = new MatTableDataSource<Classroom>(resp);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error loading classrooms:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: Classroom) {
    const dialogRef = this.dialog.open(NewOrEditClassroomComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadClassrooms();
        }
      },
    });
  }

  deleteClassroom(id: number) {
    this.classroomService.deleteClassroom(id).subscribe({
      next: (res) => {
        // Handle success or error as needed.
        this.loadClassrooms();
      },
      error: console.log,
    });
  }
  toggleSelectRow(row: any) {
    const index = this.selectedClassroomIds.indexOf(row.id);
    if (index === -1) {
      this.selectedClassroomIds.push(row.id);
    } else {
      this.selectedClassroomIds.splice(index, 1);
    }
  }
  selectAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedClassroomIds = this.dataSource.data.map(row => row.id);
    } else {
      this.selectedClassroomIds = [];
    }
  }
  isSelected(row: any): boolean {
    return this.selectedClassroomIds.indexOf(row.id) !== -1;
  }
  deleteSelectedClassrooms() {
    // Loop through selected IDs and delete them one by one
    this.selectedClassroomIds.forEach(id => {
      this.deleteClassroom(id);
    });
    // Clear the selected IDs array after bulk delete
    this.selectedClassroomIds = [];
  }

}
