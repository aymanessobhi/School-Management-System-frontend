import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Classroom} from "../models/classroom.model";
import {MatTableDataSource} from "@angular/material/table";
import {Section} from "../models/section.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ClassroomService} from "../services/classroom.service";
import {SectionService} from "../services/section.service";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit{
  sections: Section[] = [];
  selectedSectionIds: number[] = [];
  displayedColumns: string[] = ['ID', 'nameOfSection','classroom','actions'];
  dataSource: MatTableDataSource<Section>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private sectionService: SectionService) {
    this.dataSource = new MatTableDataSource<Section>();
  }
  ngOnInit(): void {
    this.loadSections();
  }
  private loadSections() {
    this.sectionService.getSections().subscribe(
      (resp) => {
        this.dataSource = new MatTableDataSource<Section>(resp);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error loading classrooms:', error);
      }
    );
  }
  openAddEditSectionForm() {

  }

  deleteSelectedSections() {

  }

  applyFilter($event: KeyboardEvent) {

  }

  toggleSelectRow(row : any) {

  }

  isSelected(row : any) {

  }


  selectAll($event: MatCheckboxChange) {

  }


  openEditForm(row : any) {

  }

  deleteSection(id : any) {

  }
}
