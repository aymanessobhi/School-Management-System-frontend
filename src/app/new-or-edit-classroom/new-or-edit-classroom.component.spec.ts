import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrEditClassroomComponent } from './new-or-edit-classroom.component';

describe('NewOrEditClassroomComponent', () => {
  let component: NewOrEditClassroomComponent;
  let fixture: ComponentFixture<NewOrEditClassroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewOrEditClassroomComponent]
    });
    fixture = TestBed.createComponent(NewOrEditClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
