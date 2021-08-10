import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-step',
  templateUrl: './location-step.component.html',
  styleUrls: ['./location-step.component.scss'],
})
export class LocationStepComponent {
  form = this.formBuilder.group({
    city: ['Ульяновск', Validators.required],
    pickPoint: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}
}
