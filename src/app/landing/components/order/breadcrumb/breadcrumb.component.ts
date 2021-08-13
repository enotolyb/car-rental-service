import { Component } from '@angular/core';
import { OrderStep } from '../../../models/order';
import { OrderNavigationService } from '../../../services/order-navigation.service';
import { breadcrumbs } from './breadcrumb.const';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  items = breadcrumbs;

  constructor(private orderNavigationService: OrderNavigationService) {}

  get activeStep(): OrderStep {
    return this.orderNavigationService.activeStep;
  }

  isCompletedStep(step: OrderStep): boolean {
    return this.orderNavigationService.checkAvailableNavigateToState(step);
  }

  navigateToStep(orderStep: OrderStep) {
    this.orderNavigationService.navigateToStep(orderStep);
  }
}
