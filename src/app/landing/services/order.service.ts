import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Order, OrderPrice } from '../models/order';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

const NEW_ORDER_ID = 'new';

@Injectable()
export class OrderService implements OnDestroy {
  private destroy = new Subject();

  order = new BehaviorSubject<Order>({} as Order);
  activeStep: number;

  order$: Observable<Order> = this.order.asObservable();
  orderPrice$: Observable<OrderPrice>;

  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    this.orderPrice$ = this.order$.pipe(
      map(order => ({
        priceTotal: order.price,
        priceMin: order.price,
      }))
    );

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activeStep = this.activeRoute.children[0].snapshot.data.step;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  updateOrder(orderDetail: Partial<Order>): void {
    this.order.next({
      ...this.order.getValue(),
      ...orderDetail,
    })
  }

  initOrder(orderId: string): void {
    if (orderId !== NEW_ORDER_ID) {
      // todo load order
    } else {
      this.order.next({
        cityId: 'Ульяновск',
        pointId: 'Московсое 33',
      } as Order);
    }
  }

  goToNextStep() {
    switch (this.activeStep) {
      case 1:
        this.router.navigate(['model'], {
          relativeTo: this.activeRoute,
        });
        break;
      case 2:
        this.router.navigate(['option'], {
          relativeTo: this.activeRoute,
        });
        break;
      case 3:
        this.router.navigate(['summary'], {
          relativeTo: this.activeRoute,
        });
        break;
    }
  }
}
