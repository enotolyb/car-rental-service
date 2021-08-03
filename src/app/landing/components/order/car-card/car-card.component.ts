import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent {
  @Input() active = false;

  @Output() checkCard = new EventEmitter();

  click() {
    this.checkCard.emit();
  }
}
