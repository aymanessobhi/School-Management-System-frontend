import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParentService} from "../services/parent.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Parent} from "../models/parent.model";
import {Nationality} from "../models/Nationality.model";
import {BloodType} from "../models/BloodType.model";
import {Religion} from "../models/religion.model";

@Component({
  selector: 'app-new-or-edit-parent',
  templateUrl: './new-or-edit-parent.component.html',
  styleUrls: ['./new-or-edit-parent.component.css']
})
export class NewOrEditParentComponent implements OnInit{
  parentForm1: FormGroup;
  parentForm2: FormGroup;
  nationalities: Nationality[] = [];
  bloodTypes: BloodType[] = [];
  religions: Religion[] = [];
  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private dialogRef: MatDialogRef<NewOrEditParentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Parent, // Use the Parent interface
    // private _coreService: CoreService
  ) {
    this.parentForm1 = this.fb.group({
      nameFather: ['', Validators.required],
      nationalIdFather: ['', Validators.required],
      passportIdFather: '',
      phoneFather: ['', Validators.required],
      jobFather: '',
      nationalityFather: null,
      bloodTypeFather: null,
      religionFather: null,
      addressFather: '',
    });

    this.parentForm2 = this.fb.group({
      nameMother: ['', Validators.required],
      nationalIdMother: ['', Validators.required],
      passportIdMother: '',
      phoneMother: ['', Validators.required],
      jobMother: '',
      nationalityMother: null,
      bloodTypeMother: null,
      religionMother: null,
      addressMother: '',
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
    if (this.data) {
      this.parentForm1.patchValue({
        nameFather: this.data.nameFather,
        nationalIdFather: this.data.nationalIdFather,
        passportIdFather: this.data.passportIdFather,
        phoneFather: this.data.phoneFather,
        jobFather: this.data.jobFather,
        nationalityFather: this.data.nationalityFather,
        bloodTypeFather: this.data.bloodTypeFather,
        religionFather: this.data.religionFather,
        addressFather: this.data.addressFather,
      });

      this.parentForm2.patchValue({
        nameMother: this.data.nameMother,
        nationalIdMother: this.data.nationalIdMother,
        passportIdMother: this.data.passportIdMother,
        phoneMother: this.data.phoneMother,
        jobMother: this.data.jobMother,
        nationalityMother: this.data.nationalityMother,
        bloodTypeMother: this.data.bloodTypeMother,
        religionMother: this.data.religionMother,
        addressMother: this.data.addressMother,
      });
    }
  }
  loadDropdownData() {

    this.parentService.getNationalities()

    this.parentService.getBloodTypes()

    this.parentService.getReligions()
  }

  onFormSubmit() {
    if (this.parentForm1.valid && this.parentForm2.valid) {
      const parentData: Parent = {
        id: this.data.id,
        email: this.data.email,
        password: this.data.password,
        ...this.parentForm1.value,
        ...this.parentForm2.value,
      };

      if (this.data.id) {
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
}
