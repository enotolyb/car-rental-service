import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  differenceInMinutes,
} from 'date-fns';
import { TariffUnit } from '../models/tariff';
import { NEW_ORDER_ID, ORDER_STATUS } from './const';
import { Order, OrderPrice } from '../models/order';
import { ApiService } from './api.service';
import { ResponseSingle } from '../models/response';
import { CarService } from './car.service';

@Injectable()
export class OrderService implements OnDestroy {
  order = new BehaviorSubject<Order>({} as Order);

  order$: Observable<Order> = this.order.asObservable();

  orderPrice$: Observable<OrderPrice>;

  private destroy = new Subject();

  constructor(private apiService: ApiService, private carService: CarService) {
    this.orderPrice$ = this.order$.pipe(map((order) => this.calcPrice(order)));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  updateOrder(orderDetail: Partial<Order>): void {
    const order = {
      ...this.order.getValue(),
      ...orderDetail,
    };
    this.order.next(order);
    localStorage.setItem('newOrder', JSON.stringify(order));
  }

  initOrder(orderId: string): Observable<void> {
    if (orderId !== NEW_ORDER_ID) {
      return this.apiService.get<ResponseSingle<Order>>(`order/${orderId}`).pipe(
        map((response) => {
          const order = {
            ...response.data,
            carId: this.carService.convertCar(response.data.carId),
          };
          this.order.next(order);
        }),
      );
    }

    let order: Order;
    try {
      if (localStorage.getItem('newOrder')) {
        order = JSON.parse(localStorage.getItem('newOrder')) as Order;
      }
    } catch (e) {}

    if (!order) {
      order = {
        cityId: {
          name: 'Ульяновск',
          id: '5ea07ad3099b810b946c6254',
        },
      } as Order;
    }

    this.order.next(order);

    return of();
  }

  calcPrice(order: Order): OrderPrice {
    if (!order.carId) {
      return { priceMin: 8000, price: 12000 };
    }

    if (!order.rateId) {
      return { priceMin: order.carId.priceMin, price: order.carId.priceMax };
    }

    const units = this.calcUnit(order);
    let sum = units * order.rateId.price + order.carId.priceMin;

    if (order.isFullTank) {
      sum += 500;
    }

    if (order.isNeedChildChair) {
      sum += 200;
    }

    if (order.isRightWheel) {
      sum += 1600;
    }

    return { price: sum };
  }

  calcUnit(order: Order): number {
    const unit = this.calcDate(order);

    return unit > 0 ? unit : 1;
  }

  createOrder(): Observable<Order> {
    return this.apiService
      .post<ResponseSingle<Order>>('order', {
        ...this.order.getValue(),
        orderStatusId: ORDER_STATUS[0],
      })
      .pipe(map((data) => data.data));
  }

  cancelOrder(): Observable<void> {
    const order = this.order.getValue();
    return this.apiService
      .put<ResponseSingle<Order>>(`order/${order.id}`, {
        ...order,
        orderStatusId: ORDER_STATUS[3],
      })
      .pipe(
        map(() => {
          delete order.id;
          delete order.orderStatusId;
          this.order.next(order);
        }),
      );
  }

  private calcDate(order: Order): number {
    if (!order.dateFrom || !order.dateTo) {
      return 1;
    }

    switch (order.rateId.rateTypeId.unit) {
      case TariffUnit.minutes:
        return differenceInMinutes(new Date(order.dateTo), new Date(order.dateFrom));
      case TariffUnit.days:
        return differenceInCalendarDays(new Date(order.dateTo), new Date(order.dateFrom));
      case TariffUnit.weeks:
        return differenceInCalendarWeeks(new Date(order.dateTo), new Date(order.dateFrom));
      case TariffUnit.months:
        return differenceInCalendarMonths(new Date(order.dateTo), new Date(order.dateFrom));
      default:
        return 1;
    }
  }
}
