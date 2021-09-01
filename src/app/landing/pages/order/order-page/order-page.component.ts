import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
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
  activeStep: OrderStep | undefined;
  private destroy = new Subject();

  constructor(
    private activeRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy))
      .subscribe((param) => this.orderService.initOrder(param.orderId));

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith({}),
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
}
