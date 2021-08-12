import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { OrderStep } from '../../../models/order';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  items = [
    {
      title: 'Местоположение',
      linkHandler: () => this.orderService.navigateToStart(),
      step: OrderStep.location,
    },
    {
      title: 'Модель',
      linkHandler: () => this.orderService.navigateToModel(),
      step: OrderStep.model,
    },
    {
      title: 'Дополнительно',
      linkHandler: () => this.orderService.navigateToOption(),
      step: OrderStep.option,
    },
    {
      title: 'Итого',
      linkHandler: () => this.orderService.navigateToSummary(),
      step: OrderStep.summary,
    },
  ];

  constructor(private orderService: OrderService) {}

  get activeStep(): OrderStep {
    return this.orderService.activeStep;
  }

  isCompletedStep(step: OrderStep): boolean {
    return this.orderService.checkAvailableNavigateToState(step);
  }
}
