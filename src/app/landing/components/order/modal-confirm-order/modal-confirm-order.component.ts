import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-modal-confirm-order',
  templateUrl: './modal-confirm-order.component.html',
})
export class ModalConfirmOrderComponent implements OnDestroy {
  private destroy = new Subject();

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  createOrder() {
    this.orderService
      .createOrder()
      .pipe(takeUntil(this.destroy))
      .subscribe((order) => this.router.navigate([`/order/${order.id}/confirm`]));
  }
}
