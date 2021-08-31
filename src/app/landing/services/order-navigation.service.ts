import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderStep } from '../models/order';
import { OrderService } from './order.service';

@Injectable()
export class OrderNavigationService implements OnDestroy {
  activeStep: OrderStep;

  private destroy = new Subject();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
  ) {
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

  goToNextStep() {
    switch (this.activeStep) {
      case OrderStep.location:
        this.navigateToStep(OrderStep.model);
        break;
      case OrderStep.model:
        this.navigateToStep(OrderStep.option);
        break;
      case OrderStep.option:
        this.navigateToStep(OrderStep.summary);
        break;
      case OrderStep.summary:
        this.navigateToStep(OrderStep.confirm);
        break;
      default:
        break;
    }
  }

  navigateToStep(orderStep: OrderStep): void {
    const routes = {
      [OrderStep.location]: './',
      [OrderStep.model]: 'model',
      [OrderStep.option]: 'option',
      [OrderStep.summary]: 'summary',
      [OrderStep.confirm]: 'summary/confirm',
    };

    if (!this.checkAvailableNavigateToState(orderStep)) {
      return alert('Заполните поля');
    }

    this.router.navigate([routes[orderStep]], {
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
    const order = this.orderService.order.getValue();
    const checkLocation = () => !!(order.cityId && order.pointId);
    const checkCar = () => !!order.carId;
    const checkOption = () => !!(order.dateFrom && order.dateTo && order.rateId);

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
