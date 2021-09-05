import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-complete-number',
  templateUrl: './order-complete-number.component.html',
  styleUrls: ['./order-complete-number.component.scss'],
})
export class OrderCompleteNumberComponent implements OnInit {
  orderId$: Observable<string>;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderId$ = this.orderService.order$.pipe(map((order) => order.id));
  }
}
