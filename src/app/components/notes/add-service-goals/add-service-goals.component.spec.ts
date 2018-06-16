import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceGoalsComponent } from './add-service-goals.component';

describe('AddServiceGoalsComponent', () => {
  let component: AddServiceGoalsComponent;
  let fixture: ComponentFixture<AddServiceGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServiceGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
