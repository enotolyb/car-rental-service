import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
} from '@angular-material-components/datetime-picker';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { CustomDateAdapter } from './custom-adapter.service';
import { CUSTOM_DATE_FORMATS } from './const';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private destroy = new Subject();

  dateControl = new FormControl();

  onChange: (value: string) => void;

  onTouch: () => void;

  ngOnInit(): void {
    this.dateControl.valueChanges.pipe(takeUntil(this.destroy)).subscribe((value) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  clearPicker(): void {
    this.writeValue('');
  }

  writeValue(value): void {
    this.dateControl.setValue(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
