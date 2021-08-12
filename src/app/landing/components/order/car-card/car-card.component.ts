import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../../../models/car';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent {
  @Input() active = false;

  @Input() car: Car;

  @Output() checkCard = new EventEmitter();

  click() {
    this.checkCard.emit();
  }
}
