import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from '../../../services/order.service';
import { OrderNavigationService } from '../../../services/order-navigation.service';
import { OrderStep } from '../../../models/order';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService, OrderNavigationService],
})
export class OrderPageComponent implements OnInit, OnDestroy {
  private destroy = new Subject();

  constructor(
    private activeRoute: ActivatedRoute,
    private orderService: OrderService,
    private orderNavigationService: OrderNavigationService,
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy))
      .subscribe((param) => this.orderService.initOrder(param.orderId));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getActiveStep(): OrderStep | undefined {
    return this.orderNavigationService.activeStep;
  }
}
