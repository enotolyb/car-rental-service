import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-model-step',
  templateUrl: './choose-model-step.component.html',
  styleUrls: ['./choose-model-step.component.scss'],
})
export class ChooseModelStepComponent {
  selectedCarId: number | null;

  cars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
}
