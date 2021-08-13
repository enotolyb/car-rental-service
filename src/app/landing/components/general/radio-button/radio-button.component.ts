import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
  ],
})
export class RadioButtonComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private destroy = new Subject();

  @Input() name: string;

  @Input() value: string;

  radioButtonControl = new FormControl();

  onChange: (value: string) => void;

  onTouch: () => void;

  ngOnInit(): void {
    this.radioButtonControl.valueChanges.pipe(takeUntil(this.destroy)).subscribe((value) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
  }

  writeValue(value): void {
    this.radioButtonControl.setValue(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
