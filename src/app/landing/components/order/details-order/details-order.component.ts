import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderPrice, OrderStep } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { OrderNavigationService } from '../../../services/order-navigation.service';
import { TariffUnit } from '../../../models/tariff';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.scss'],
})
export class DetailsOrderComponent {
  order$: Observable<Order> = this.orderService.order$;

  price$: Observable<OrderPrice> = this.orderService.orderPrice$;

  tariffUnit = TariffUnit;

  constructor(
    private orderNavigationService: OrderNavigationService,
    private orderService: OrderService,
  ) {}

  get activeStep(): OrderStep {
    return this.orderNavigationService.activeStep;
  }

  goToNextStep() {
    this.orderNavigationService.goToNextStep();
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
        return 'Отменить заказ';
    }
  }

  calcUnit(order: Order): number {
    return this.orderService.calcUnit(order);
  }

  getThemeButton(): 'red' | 'green' | 'blocked' {
    if (this.activeStep === OrderStep.confirm) {
      return 'red';
    }
    if (!this.orderNavigationService.checkIsCompleteStep(this.activeStep)) {
      return 'blocked';
    }

    return 'green';
  }
}
