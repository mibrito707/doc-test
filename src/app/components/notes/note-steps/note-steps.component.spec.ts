import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteStepsComponent } from './note-steps.component';

describe('NoteStepsComponent', () => {
  let component: NoteStepsComponent;
  let fixture: ComponentFixture<NoteStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
