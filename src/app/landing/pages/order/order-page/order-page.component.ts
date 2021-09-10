import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { OrderService } from '../../../services/order.service';
import { OrderNavigationService } from '../../../services/order-navigation.service';
import { OrderStep } from '../../../models/order';
import { NEW_ORDER_ID } from '../../../services/const';

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
      .pipe(
        switchMap(({ orderId }) =>
          orderId === NEW_ORDER_ID
            ? this.orderService.getNewOrder()
            : this.orderService.getOrderById(orderId),
        ),
        takeUntil(this.destroy),
      )
      .subscribe((order) => this.orderService.setOrder(order));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  isCompleteOrder(): boolean {
    return this.orderNavigationService.activeStep === OrderStep.confirm;
  }
}
