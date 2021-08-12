import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Order, OrderPrice, OrderStep } from '../models/order';
import { NEW_ORDER_ID } from './const';

@Injectable()
export class OrderService implements OnDestroy {
  order = new BehaviorSubject<Order>({} as Order);

  activeStep: OrderStep;

  order$: Observable<Order> = this.order.asObservable();

  orderPrice$: Observable<OrderPrice>;

  private destroy = new Subject();

  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    this.orderPrice$ = this.order$.pipe(
      map((order) => ({
        priceTotal: order.price,
        priceMin: order.price,
      })),
    );

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
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
    });
  }

  initOrder(orderId: string): void {
    if (orderId !== NEW_ORDER_ID) {
      // todo load order
    } else {
      this.order.next({
        cityId: 'Ульяновск',
        pointId: 'Наримова 42',
      } as Order);
    }
  }

  goToNextStep() {
    switch (this.activeStep) {
      case OrderStep.location:
        this.navigateToModel();
        break;
      case OrderStep.model:
        this.navigateToOption();
        break;
      case OrderStep.option:
        this.navigateToSummary();
        break;
      case OrderStep.summary:
        this.router.navigate(['summary/confirm'], {
          relativeTo: this.activeRoute,
        });
        break;
      default:
        break;
    }
  }

  navigateToStart() {
    this.router.navigate(['./'], {
      relativeTo: this.activeRoute,
    });
  }

  navigateToModel() {
    if (!this.checkAvailableNavigateToState(OrderStep.model)) {
      return alert('Заполните поля');
    }

    this.router.navigate(['model'], {
      relativeTo: this.activeRoute,
    });
  }

  navigateToOption() {
    if (!this.checkAvailableNavigateToState(OrderStep.option)) {
      return alert('Заполните поля');
    }

    this.router.navigate(['option'], {
      relativeTo: this.activeRoute,
    });
  }

  navigateToSummary() {
    if (!this.checkAvailableNavigateToState(OrderStep.summary)) {
      return alert('Заполните поля');
    }

    this.router.navigate(['summary'], {
      relativeTo: this.activeRoute,
    });
  }

  checkAvailableNavigateToState(step: OrderStep): boolean {
    switch (step) {
      case OrderStep.location:
        return true;

      case OrderStep.model:
        return this.checkIsCompleteStep(OrderStep.location);

      case OrderStep.option:
        return this.checkIsCompleteStep(OrderStep.model);

      case OrderStep.summary:
        return this.checkIsCompleteStep(OrderStep.option);

      default:
        return true;
    }
  }

  checkIsCompleteStep(step: OrderStep): boolean {
    const order = this.order.getValue();
    const checkLocation = () => !!(order.cityId && order.pointId);
    const checkCar = () => !!order.carId;
    const checkOption = () => !!(order.color && order.dateFrom && order.dateTo && order.rateId);

    switch (step) {
      case OrderStep.location:
        return checkLocation();

      case OrderStep.model:
        return checkCar() && checkLocation();

      case OrderStep.option:
      case OrderStep.summary:
        return checkLocation() && checkCar() && checkOption();

      default:
        return true;
    }
  }
}
