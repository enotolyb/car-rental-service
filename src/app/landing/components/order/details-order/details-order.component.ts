import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderStep } from '../../../models/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.scss'],
})
export class DetailsOrderComponent {
  order$: Observable<Order> = this.orderService.order$;

  constructor(private orderService: OrderService) {}

  get activeStep(): OrderStep {
    return this.orderService.activeStep;
  }

  goToNextStep() {
    this.orderService.goToNextStep();
  }

  titleButton(): string {
    switch (this.activeStep) {
      case OrderStep.location:
        return 'Выбрать модель';
      case OrderStep.model:
        return 'Дополнительно';
      case OrderStep.option:
        return 'Итого';
      case OrderStep.summary:
        return 'Заказать';
      default:
        return '';
    }
  }

  isDisabledButton(): boolean {
    return !this.orderService.checkIsCompleteStep(this.activeStep);
  }
}
