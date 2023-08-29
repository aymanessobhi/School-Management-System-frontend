import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ParentService} from "../services/parent.service";
import {NewOrEditParentComponent} from "../new-or-edit-parent/new-or-edit-parent.component";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
    displayedColumns :string[] =[
      'id',
      'nameFather',
      'nameMother',
      'phoneFather',
      'phoneMother',
      'nationalIdFather',
      'nationalIdMother',
      'action'
    ];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    constructor(
      private _dialog: MatDialog,
      private _parentService: ParentService
    ) {}
    ngOnInit(): void {
      this.getParentList();
    }
    openAddEditParentForm() {
      const dialogRef = this._dialog.open(NewOrEditParentComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getParentList();
          }
        },
      });
    }
  getParentList() {
        this._parentService.getAllParents().subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },
          error: console.log,
        });
      }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    deleteParent(id: number) {
      this._parentService.deleteParent(id).subscribe({
        next: (res) => {
          console.log('Parent deleted!', res);
          this.getParentList();
        },
        error: console.log,
      });
    }
    openEditForm(data: any) {
      const dialogRef = this._dialog.open(NewOrEditParentComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getParentList();
          }
        },
      });
    }
}