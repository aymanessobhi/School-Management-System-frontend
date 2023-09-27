import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parent } from '../models/parent.model';
import { ParentService } from '../services/parent.service';

@Component({
  selector: 'app-view-parent-details',
  templateUrl: './view-parent-details.component.html',
  styleUrls: ['./view-parent-details.component.css']
})
export class ViewParentDetailsComponent implements OnInit {
  files: string[] = []; // Initialize an array to store the file names

  constructor(@Inject(MAT_DIALOG_DATA) public parent: Parent, private parentService: ParentService) {}

  ngOnInit(): void {
    // Fetch files for the parent when the component is initialized
    this.fetchParentFiles(this.parent.id || 0);
  }

  // Function to fetch files for the parent
  fetchParentFiles(parentId: number) {
    this.parentService.getFilesByParentId(parentId).subscribe(
      (response) => {
        this.files = response;
      },
      (error) => {
        console.error('Error fetching parent files:', error);
      }
    );
  }
}
