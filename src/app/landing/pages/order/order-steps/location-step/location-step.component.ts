import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../../../services/order.service';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-location-step',
  templateUrl: './location-step.component.html',
  styleUrls: ['./location-step.component.scss'],
})
export class LocationStepComponent implements OnInit {
  private destroy = new Subject();

  form = this.formBuilder.group({
    cityId: ['', Validators.required],
    pointId: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((form) => {
      this.orderService.updateOrder(form);
    });

    this.orderService.order$.pipe(take(1)).subscribe(order => {
      this.form.patchValue({
        cityId: order.cityId,
        pointId: order.pointId,
      })
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
