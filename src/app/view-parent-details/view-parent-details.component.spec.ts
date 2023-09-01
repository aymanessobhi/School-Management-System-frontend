import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParentDetailsComponent } from './view-parent-details.component';

describe('ViewParentDetailsComponent', () => {
  let component: ViewParentDetailsComponent;
  let fixture: ComponentFixture<ViewParentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewParentDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewParentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
