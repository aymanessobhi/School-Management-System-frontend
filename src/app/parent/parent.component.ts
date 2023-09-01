import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ParentService} from "../services/parent.service";
import {NewOrEditParentComponent} from "../new-or-edit-parent/new-or-edit-parent.component";
import {Parent} from "../models/parent.model";
import {ViewParentDetailsComponent} from "../view-parent-details/view-parent-details.component";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{
    displayedColumns :string[] =[
      'id',
      'nameFather',
      'nameMother',
      'phoneFather',
      'phoneMother',
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
  addFiles(parent: Parent) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = '.pdf'; // Set the accepted file types if needed
    fileInput.addEventListener('change', (event) => {
      const selectedFiles = (event.target as HTMLInputElement).files;
      if (selectedFiles) {
        parent.files = parent.files || [];
        for (let i = 0; i < selectedFiles.length; i++) {
          parent.files.push(selectedFiles[i]);
        }
        // Upload the files to the server
        this.uploadFilesForParent(parent);
      }
    });
    fileInput.click();
  }

  uploadFilesForParent(parent: Parent) {
    if (parent.files && parent.files.length > 0) {
      const parentId = parent.id || 0; // Replace with actual parent ID
      this._parentService.uploadParentFiles(parentId, parent.files).subscribe(
        (response) => {
          console.log('Response from server:', response);
        },
        (error) => {
          console.error('File upload error:', error);
        }
      );
    }
  }
  viewDetails(parent: Parent) {
    // You can implement logic to display the details and files for the selected parent.
    // This can be done using a dialog or by navigating to a new page.
    // For example, you can create a new component for displaying the details.
    // Here's an example of how to open a dialog:

    const dialogRef = this._dialog.open(ViewParentDetailsComponent, {
      data: parent, // Pass the selected parent data to the dialog
      width: '500px', // Set the dialog width as needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions after the dialog is closed if needed
    });
  }

}
