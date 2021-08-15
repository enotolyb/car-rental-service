import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, take, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { OrderService } from '../../../../services/order.service';
import { TariffsService } from '../../../../services/tariffs.service';
import { Tariff } from '../../../../models/tariff';

@Component({
  selector: 'app-additional-option-step',
  templateUrl: './additional-option-step.component.html',
  styleUrls: ['./additional-option-step.component.scss'],
})
export class AdditionalOptionStepComponent implements OnInit, OnDestroy {
  tariffs$: Observable<Tariff[]>;

  colors$: Observable<string[]>;

  private destroy = new Subject();

  formControl = new FormGroup({
    color: new FormControl(),
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    rateId: new FormControl(),
    isFullTank: new FormControl(),
    isNeedChildChair: new FormControl(),
    isRightWheel: new FormControl(),
  });

  constructor(private orderService: OrderService, private tariffsService: TariffsService) {}

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(takeUntil(this.destroy)).subscribe((form) => {
      this.orderService.updateOrder(form);
    });

    this.orderService.order$.pipe(take(1)).subscribe((order) => {
      this.formControl.patchValue({
        color: order.color,
        dateFrom: order.dateFrom,
        dateTo: order.dateTo,
        rateId: order.rateId,
        isFullTank: order.isFullTank,
        isNeedChildChair: order.isNeedChildChair,
        isRightWheel: order.isRightWheel,
      });
    });

    this.tariffs$ = this.tariffsService.getRates();

    this.colors$ = this.orderService.order$.pipe(map((order) => order.carId.colors));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
