import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, shareReplay, take, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { OrderService } from '../../../../services/order.service';
import { TariffsService } from '../../../../services/tariffs.service';
import { Tariff } from '../../../../models/tariff';

@Component({
  selector: 'app-additional-option-step',
  templateUrl: './additional-option-step.component.html',
  styleUrls: ['./additional-option-step.component.scss'],
})
export class AdditionalOptionStepComponent implements OnInit, OnDestroy {
  tariffs$: Observable<Tariff[]> = this.tariffsService.getRates().pipe(shareReplay(1));

  colors$: Observable<string[]> = this.orderService.order$.pipe(map((order) => order.carId.colors));

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
    combineLatest([this.formControl.valueChanges, this.tariffs$])
      .pipe(takeUntil(this.destroy))
      .subscribe(([form, tariffs]) => {
        this.orderService.updateOrder({
          ...form,
          rateId: tariffs.find((it) => it.id === form.rateId),
        });
      });

    this.orderService.order$.pipe(take(1)).subscribe((order) => {
      this.formControl.patchValue({
        color: order.color,
        dateFrom: order.dateFrom,
        dateTo: order.dateTo,
        rateId: order.rateId?.id,
        isFullTank: order.isFullTank,
        isNeedChildChair: order.isNeedChildChair,
        isRightWheel: order.isRightWheel,
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
