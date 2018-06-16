import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';

import { Directive, ElementRef, forwardRef, Input } from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { WTimeComponent } from './time-control/w-time/w-time.component';

export const MAT_TIMEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimepickerDirective),
  multi: true
};

export const MAT_TIMEPICKER_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => TimepickerDirective),
  multi: true
};

export class MatTimepickerInputEvent {
  /** The new value for the target timepicker input. */
  value: string;

  constructor(
    /** Reference to the timepicker input component that emitted the event. */
    public target: TimepickerDirective,
    /** Reference to the native input element associated with the timepicker input. */
    public targetElement: HTMLElement
  ) {
    this.value = this.target.value;
  }
}

@Directive({
  selector: 'input[matTimepicker]',
  providers: [
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: TimepickerDirective }
  ],
  exportAs: 'matTimepickerInput'
})
export class TimepickerDirective {
  @Input() matTimepicker: WTimeComponent;

  @Input()
  get value(): string {
    if (this.matTimepicker) {
      if (!this.matTimepicker.userTime) {
        this._elementRef.nativeElement.value = '';
        return '';
      }

      let meriden = `${this.matTimepicker.userTime.meriden}`;
      if (this.matTimepicker.userTime.format === 24) {
        meriden = '';
      }

      let hour = `${this.matTimepicker.userTime.hour}`;
      if (this.matTimepicker.userTime.hour === 24) {
        hour = '00';
      } else if (this.matTimepicker.userTime.hour) {
        hour = `0${hour}`;
      }

      if (this.matTimepicker.userTime.minute === 0) {
        let value = `${hour}:00`;
        if (meriden) {
          value += ` ${meriden}`;
        }
        this._elementRef.nativeElement.value = value;
        return value;
      } else if (this.matTimepicker.userTime.minute < 10) {
        const tt = '0' + String(this.matTimepicker.userTime.minute);
        let value = `${hour}:${tt}`;
        if (meriden) {
          value += ` ${meriden}`;
        }
        this._elementRef.nativeElement.value = value;
        return value;
      } else {
        let value = `${hour}:${this.matTimepicker.userTime.minute}`;
        if (meriden) {
          value += ` ${meriden}`;
        }
        this._elementRef.nativeElement.value = value;

        return value;
      }
    }

    this._elementRef.nativeElement.value = '';
    return '';
  }

  constructor(private _elementRef: ElementRef) {}
}
