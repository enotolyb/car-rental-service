import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  constructor(private orderService: OrderService) {
  }

  get activeStep(): number {
    return this.orderService.activeStep;
  }

  isCompletedStep(stepNum: number): boolean {
    return this.activeStep >= stepNum;
  }
}
