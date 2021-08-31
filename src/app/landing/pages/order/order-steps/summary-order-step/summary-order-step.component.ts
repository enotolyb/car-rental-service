import { Component } from '@angular/core';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-summary-order-step',
  templateUrl: './summary-order-step.component.html',
  styleUrls: ['./summary-order-step.component.scss'],
})
export class SummaryOrderStepComponent {
  order$ = this.orderService.order$;

  constructor(private orderService: OrderService) {}
}
