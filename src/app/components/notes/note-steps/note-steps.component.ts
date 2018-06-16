import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith, debounceTime, tap, filter } from 'rxjs/operators';
import { ServiceNote, CaseData, ClientDomain } from '../../../models/models';
import { NoteDataService } from '../../../services/note-data.service';
import { Store } from '@ngrx/store';
import { CaseState } from '../../../store/reducers';

@Component({
  selector: 'app-note-steps',
  templateUrl: './note-steps.component.html',
  styleUrls: ['./note-steps.component.scss']
})
export class NoteStepsComponent implements OnInit {
  isLinear = false;
  generalFormGroup: FormGroup;
  noteServices: ServiceNote[] = [];
  noteServicesViewer: BehaviorSubject<ServiceNote[]> = new BehaviorSubject<
    ServiceNote[]
  >([]);

  casesNumber: string[] = [];
  filteredCases: Observable<string[]>;
  filteredDomain: BehaviorSubject<ClientDomain[]> = new BehaviorSubject<
    ClientDomain[]
  >([]);
  case: CaseData = null;

  constructor(
    private formBuilder: FormBuilder,
    private noteDataService: NoteDataService
  ) {
    this.createForm();
    this.casesNumber = this.noteDataService.getClientList();
  }
  /**
   * Create the form steps
   */
  createForm() {
    this.generalFormGroup = this.formBuilder.group({
      case: ['', [Validators.required, this.caseNumberValidator]],
      date: [{ value: '', disabled: false }, Validators.required]
    });
  }

  ngOnInit() {
    this.observeFormValues();
  }

  /**
   * Observe form values
   */
  observeFormValues() {
    // filter cases numbers
    this.filteredCases = this.generalFormGroup.get('case').valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      map(this.filterCases)
    );

    this.generalFormGroup.statusChanges
      .pipe(
        debounceTime(500),
        // tap(console.log),
        filter(status => status === 'VALID')
      )
      .subscribe(() => {
        if (this.generalFormGroup.get('case').valid) {
          this.filteredDomain.next(
            this.noteDataService.getCaseDomains(
              this.generalFormGroup.get('case').value
            )
          );
        }
      });
  }

  /**
   * Filter the Cases numbers
   * @param userInput
   */
  filterCases = (userInput: string): string[] =>
    this.casesNumber.filter(option =>
      option.toLowerCase().includes(userInput.toLowerCase())
    );

  addServiceNote(serviceNote: ServiceNote) {
    // @TODO: more checks here:
    // service overlapping
    serviceNote.date = this.generalFormGroup.get('date').value;
    this.noteServices.push(serviceNote);
    this.noteServicesViewer.next(this.noteServices);
  }

  handleRemoveServiceNote(noteId: string) {
    const snId = this.noteServices.findIndex(sn => sn.id === noteId);
    if (snId >= 0) {
      this.noteServices.splice(snId, 1);
      this.noteServicesViewer.next(this.noteServices);
    }
  }

  /**
   * Custom validator for cases
   */
  /** A hero's name can't match the given regular expression */
  caseNumberValidator = (control: AbstractControl) => {
    const caseNumber = control.value.trim();
    const caseIndex = this.casesNumber.findIndex(c => c === caseNumber);
    return caseIndex < 0 ? { caseNumber: { value: control.value } } : null;
  };
}
