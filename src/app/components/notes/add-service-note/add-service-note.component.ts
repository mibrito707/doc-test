import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { debounceTime, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { ServiceNote } from '../../../models';
import * as uuid from 'uuid/v1';

@Component({
  selector: 'app-add-service-note',
  templateUrl: './add-service-note.component.html',
  styleUrls: ['./add-service-note.component.scss']
})
export class AddServiceNoteComponent implements OnInit {
  servicesFormGroup: FormGroup;
  @Output()
  newServiceNote: EventEmitter<ServiceNote> = new EventEmitter<ServiceNote>();

  constructor(private formBuilder: FormBuilder) {
    this.servicesFormGroup = this.formBuilder.group({
      setting: ['', Validators.required],
      start: [{ value: '', disabled: false }, Validators.required],
      end: [{ value: '', disabled: false }, Validators.required],
      minutes: [{ value: '', disabled: true }, Validators.required],
      units: [{ value: '', disabled: true }, Validators.required],
      onBehalf: [{ value: false, disabled: false }]
    });
  }

  ngOnInit() {
    // calculate minutes + units
    combineLatest(
      this.servicesFormGroup.get('start').valueChanges,
      this.servicesFormGroup.get('end').valueChanges
    )
      .pipe(
        debounceTime(200),
        tap(this.resetMinutesUnits),
        map(([start, end]) => ({
          start: moment(start, 'HH:mm'),
          end: moment(end, 'HH:mm')
        })),
        filter(({ start, end }) => start.isValid() && end.isValid())
      )
      .subscribe(this.calculateServiceMinutes);
  }
  calculateServiceMinutes = ({ start, end }) => {
    const difference = end.diff(start, 'minutes');
    if (difference > 5) {
      this.servicesFormGroup.get('minutes').setValue(difference);
      this.servicesFormGroup
        .get('units')
        .setValue(this.calculateUnits(difference));
      this.servicesFormGroup.get('end').updateValueAndValidity();
    } else {
      this.servicesFormGroup.get('end').setErrors({ mayorQue: true });
    }
  };

  calculateUnits(minutes) {
    let units = 0;
    units = minutes / 8;
    // if (minutes < 8) {
    //   units = 1;
    // }
    return Math.ceil(units);
  }

  resetMinutesUnits = () => {
    this.servicesFormGroup.get('minutes').reset();
    this.servicesFormGroup.get('units').reset();
  };

  addService() {
    if (this.servicesFormGroup.valid) {
      const serviceNote: ServiceNote = this.servicesFormGroup.getRawValue();
      serviceNote.id = uuid();
      serviceNote.start = moment(serviceNote.start, 'HH:mm').format('hh:mm A');
      serviceNote.end = moment(serviceNote.end, 'HH:mm').format('hh:mm A');
      this.newServiceNote.emit(serviceNote);
      this.servicesFormGroup.reset();
    }
  }
}
