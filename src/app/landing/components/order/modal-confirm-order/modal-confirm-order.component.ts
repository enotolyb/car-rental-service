import { Component, OnDestroy } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-confirm-order',
  templateUrl: './modal-confirm-order.component.html',
  styleUrls: ['./modal-confirm-order.component.scss'],
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
