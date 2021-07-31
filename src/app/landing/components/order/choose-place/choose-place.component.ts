import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-choose-place',
  templateUrl: './choose-place.component.html',
  styleUrls: ['./choose-place.component.scss'],
})
export class ChoosePlaceComponent {
  form = this.formBuilder.group({
    city: ['Ульяновск', Validators.required],
    pickPoint: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}
}
