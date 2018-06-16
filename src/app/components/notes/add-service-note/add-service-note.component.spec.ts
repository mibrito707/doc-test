import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceNoteComponent } from './add-service-note.component';

describe('AddServiceNoteComponent', () => {
  let component: AddServiceNoteComponent;
  let fixture: ComponentFixture<AddServiceNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServiceNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
