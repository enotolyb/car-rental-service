import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-modal-order-cancell',
  templateUrl: './modal-order-cancel.component.html',
})
export class ModalOrderCancelComponent implements OnDestroy {
  private destroy = new Subject();

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  cancelOrder() {
    this.orderService
      .cancelOrder()
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.router.navigate([`/order/new/summary`]));
  }
}
