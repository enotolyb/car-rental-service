import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-complete-number',
  templateUrl: './order-complete-number.component.html',
  styleUrls: ['./order-complete-number.component.scss'],
})
export class OrderCompleteNumberComponent {
  orderId$: Observable<string> = this.orderService.order$.pipe(map((order) => order.id));

  constructor(private orderService: OrderService) {}
}
