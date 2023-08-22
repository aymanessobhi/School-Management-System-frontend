import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GradeService} from "../services/grade.service";
import {Grade} from "../models/grade.model";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-grade',
  templateUrl: './new-grade.component.html',
  styleUrls: ['./new-grade.component.css']
})
export class NewGradeComponent implements OnInit{
  formGrade !: FormGroup;
  constructor(private gradeService:GradeService,
              private fb : FormBuilder,
              private dialogRef : MatDialogRef<NewGradeComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any) {
    this.formGrade = this.fb.group({
      nameGrade : '',
      notes : ''
    })
  }

  ngOnInit(): void {
   this.formGrade.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.formGrade.valid){
      if (this.data){
        this.gradeService.updateGrade(this.data.id,this.formGrade.value)
          .subscribe({
            next : (val : any) =>{
              this.dialogRef.close(true);
            },
            error : (err : any) =>{
              console.log(err)
            }
          })
      }else {
        this.gradeService.saveGrade(this.formGrade.value).subscribe({
          next : (val) =>{
            this.dialogRef.close(true);
          },error : (err : any) =>{
            console.log(err)
          }
        })
      }
    }
  }
}
