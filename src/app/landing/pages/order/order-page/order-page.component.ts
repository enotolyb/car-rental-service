import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService],
})
export class OrderPageComponent implements OnInit, OnDestroy {
  private destroy = new Subject();

  constructor(private activeRoute: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy))
      .subscribe((param) => this.orderService.initOrder(param.orderId));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
