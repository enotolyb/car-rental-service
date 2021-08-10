import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.scss'],
})
export class DetailsOrderComponent {
  order$: Observable<Order> = this.orderService.order$;

  constructor(private orderService: OrderService) {}

  get activeStep(): number {
    return this.orderService.activeStep;
  }

  goToNextStep() {
    this.orderService.goToNextStep();
  }

  titleButton(): string {
    switch (this.activeStep) {
      case 1:
        return 'Выбрать модель';
      case 2:
        return 'Дополнительно';
      case 3:
        return 'Итого';
      case 4:
        return 'Заказать';
      default:
        return '';
    }
  }
}
