import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTeacherComponent } from './add-edit-teacher.component';

describe('AddEditTeacherComponent', () => {
  let component: AddEditTeacherComponent;
  let fixture: ComponentFixture<AddEditTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTeacherComponent]
    });
    fixture = TestBed.createComponent(AddEditTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
