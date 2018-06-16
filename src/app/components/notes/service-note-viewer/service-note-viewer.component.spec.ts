import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceNoteViewerComponent } from './service-note-viewer.component';

describe('ServiceNoteViewerComponent', () => {
  let component: ServiceNoteViewerComponent;
  let fixture: ComponentFixture<ServiceNoteViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceNoteViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceNoteViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
