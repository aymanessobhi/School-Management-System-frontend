import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrEditParentComponent } from './new-or-edit-parent.component';

describe('NewOrEditParentComponent', () => {
  let component: NewOrEditParentComponent;
  let fixture: ComponentFixture<NewOrEditParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewOrEditParentComponent]
    });
    fixture = TestBed.createComponent(NewOrEditParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
