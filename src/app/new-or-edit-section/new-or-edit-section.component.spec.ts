import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrEditSectionComponent } from './new-or-edit-section.component';

describe('NewOrEditSectionComponent', () => {
  let component: NewOrEditSectionComponent;
  let fixture: ComponentFixture<NewOrEditSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewOrEditSectionComponent]
    });
    fixture = TestBed.createComponent(NewOrEditSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
