import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderPrice } from '../models/order';
import { NEW_ORDER_ID } from './const';

@Injectable()
export class OrderService implements OnDestroy {
  order = new BehaviorSubject<Order>({} as Order);

  order$: Observable<Order> = this.order.asObservable();

  orderPrice$: Observable<OrderPrice>;

  private destroy = new Subject();

  constructor() {
    this.orderPrice$ = this.order$.pipe(
      map((order) => ({
        priceTotal: order.price,
        priceMin: order.price,
      })),
    );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  updateOrder(orderDetail: Partial<Order>): void {
    this.order.next({
      ...this.order.getValue(),
      ...orderDetail,
    });
  }

  initOrder(orderId: string): void {
    if (orderId !== NEW_ORDER_ID) {
      // todo load order
    } else {
      this.order.next({
        cityId: {
          name: 'Ульяновск',
          id: '5ea07ad3099b810b946c6254',
        },
      } as Order);
    }
  }
}
