import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ServiceNote } from '../../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service-note-viewer',
  templateUrl: './service-note-viewer.component.html',
  styleUrls: ['./service-note-viewer.component.scss']
})
export class ServiceNoteViewerComponent {
  @Input() noteServices: Observable<ServiceNote[]>;
  @Output()
  removeServiceNote: EventEmitter<string> = new EventEmitter<string>();
  noteServicesTableColumns = [
    'date',
    'setting',
    'onBehalf',
    'start',
    'end',
    'minutes',
    'units',
    'actions'
  ];
  constructor() {}


  clickRemoveServiceNote(noteId: string) {
    this.removeServiceNote.emit(noteId);
  }
}
