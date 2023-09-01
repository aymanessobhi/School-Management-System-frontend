import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParentService} from "../services/parent.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Parent} from "../models/parent.model";
import {Nationality} from "../models/Nationality.model";
import {BloodType} from "../models/BloodType.model";
import {Religion} from "../models/religion.model";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-new-or-edit-parent',
  templateUrl: './new-or-edit-parent.component.html',
  styleUrls: ['./new-or-edit-parent.component.css']
})
export class NewOrEditParentComponent implements OnInit{
  parentForm: FormGroup;
  isLinear = false;
  nationalities: Nationality[] = [];
  bloodTypes: BloodType[] = [];
  selectedAttachment!: File;
  religions: Religion[] = [];
  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private dialogRef: MatDialogRef<NewOrEditParentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private _coreService: CoreService
  ) {
    this.parentForm = this.fb.group({
        fatherForm : this.fb.group({
            email : this.fb.control('',[Validators.required]),
            password : this.fb.control('',[Validators.required]),
            nameFather: ['', Validators.required],
            nationalIdFather: ['', Validators.required],
            passportIdFather: '',
            phoneFather: ['', Validators.required],
            jobFather: '',
            nationalityFather: null,
            bloodTypeFather: null,
            religionFather: null,
            addressFather: '',
            attachment: ['']
      }),
        motherForm : this.fb.group({
            nameMother: ['', Validators.required],
            nationalIdMother: ['', Validators.required],
            passportIdMother: '',
            phoneMother: ['', Validators.required],
            jobMother: '',
            nationalityMother: null,
            bloodTypeMother: null,
            religionMother: null,
            addressMother: '',
        })
    });
  }

  get fatherForm(){
    return this.parentForm.get("fatherForm") as FormGroup;
  }

  get motherForm(){
    return this.parentForm.get("motherForm") as FormGroup;
  }

  ngOnInit(): void {
    console.log('Dialog Component Data:', this.data);
    this.loadDropdownData();
    if (this.parentForm.valid) {
      this.parentForm.patchValue({
        fatherForm : {
          nameFather: this.data.nameFather,
          nationalIdFather: this.data.nationalIdFather,
          passportIdFather: this.data.passportIdFather,
          phoneFather: this.data.phoneFather,
          jobFather: this.data.jobFather,
          nationalityFather: this.data.nationalityFather,
          bloodTypeFather: this.data.bloodTypeFather,
          religionFather: this.data.religionFather,
          addressFather: this.data.addressFather,
        },
        motherForm :{
          nameMother: this.data.nameMother,
          nationalIdMother: this.data.nationalIdMother,
          passportIdMother: this.data.passportIdMother,
          phoneMother: this.data.phoneMother,
          jobMother: this.data.jobMother,
          nationalityMother: this.data.nationalityMother,
          bloodTypeMother: this.data.bloodTypeMother,
          religionMother: this.data.religionMother,
          addressMother: this.data.addressMother,
        }

      })
    }
  }
  loadDropdownData() {
    this.parentService.getNationalities().subscribe((data) => {
      this.nationalities = data;
    });

    this.parentService.getBloodTypes().subscribe((data) => {
      this.bloodTypes = data;
    });

    this.parentService.getReligions().subscribe((data) => {
      this.religions = data;
    });
  }

  onFormSubmit() {
    if (this.parentForm.valid) {
      const parentData: any = {
        email : this.fatherForm.get('email')?.value,
        password: this.fatherForm.get('password')?.value,
        nameFather: this.fatherForm.get('nameFather')?.value,
        nationalIdFather: this.fatherForm.get('nationalIdFather')?.value,
        passportIdFather: this.fatherForm.get('passportIdFather')?.value,
        phoneFather: this.fatherForm.get('phoneFather')?.value,
        jobFather: this.fatherForm.get('jobFather')?.value,
        nationalityFather: this.fatherForm.get('nationalityFather')?.value,
        bloodTypeFather: this.fatherForm.get('bloodTypeFather')?.value,
        religionFather: this.fatherForm.get('religionFather')?.value,
        addressFather: this.fatherForm.get('addressFather')?.value,

        nameMother: this.motherForm.get('nameMother')?.value,
        nationalIdMother: this.motherForm.get('nationalIdMother')?.value,
        passportIdMother: this.motherForm.get('passportIdMother')?.value,
        phoneMother: this.motherForm.get('phoneMother')?.value,
        jobMother: this.motherForm.get('jobMother')?.value,
        nationalityMother: this.motherForm.get('nationalityMother')?.value,
        bloodTypeMother: this.motherForm.get('bloodTypeMother')?.value,
        religionMother: this.motherForm.get('religionMother')?.value,
        addressMother: this.motherForm.get('addressMother')?.value,
      };
      if (this.data) {
        this.parentService.updateParent(this.data.id, parentData).subscribe({
          next: (val: any) => {
            // this._coreService.openSnackBar('Parent detail updated!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this.parentService.createParent(parentData).subscribe({
          next: (val: any) => {
            // this._coreService.openSnackBar('Parent added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  onAttachmentChange(event: any) {
    const file = event.target.files[0];
    this.parentForm.patchValue({ attachment: file });
    this.selectedAttachment = file;
  }

}
