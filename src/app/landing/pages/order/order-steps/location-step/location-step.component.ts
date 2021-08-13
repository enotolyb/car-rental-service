import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-location-step',
  templateUrl: './location-step.component.html',
  styleUrls: ['./location-step.component.scss'],
})
export class LocationStepComponent implements OnInit, OnDestroy {
  private destroy = new Subject();

  form = this.formBuilder.group({
    cityId: ['', Validators.required],
    pointId: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe((form) => {
      this.orderService.updateOrder(form);
    });

    this.orderService.order$.pipe(take(1)).subscribe((order) => {
      this.form.patchValue({
        cityId: order.cityId,
        pointId: order.pointId,
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
