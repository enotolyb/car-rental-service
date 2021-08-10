import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-additional-option-step',
  templateUrl: './additional-option-step.component.html',
  styleUrls: ['./additional-option-step.component.scss'],
})
export class AdditionalOptionStepComponent {
  options = [
    { id: 1, label: 'Полный бак, 500р' },
    { id: 2, label: 'Детское кресло, 200р' },
    { id: 3, label: 'Правый руль, 1600р' },
  ];

  formControl = new FormGroup({
    color: new FormControl(),
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    payment: new FormControl(),
    options: new FormControl(),
  });
}
