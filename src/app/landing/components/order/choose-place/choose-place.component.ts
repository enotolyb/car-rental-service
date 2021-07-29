import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-place',
  templateUrl: './choose-place.component.html',
  styleUrls: ['./choose-place.component.scss'],
})
export class ChoosePlaceComponent {
  searchCity = 'Ульяновск';

  pickPoint = '';

  clearInputCity() {
    this.searchCity = null;
  }

  clearInputPickPoint() {
    this.pickPoint = null;
  }
}
