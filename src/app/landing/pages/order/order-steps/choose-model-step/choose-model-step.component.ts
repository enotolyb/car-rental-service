import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-choose-model-step',
  templateUrl: './choose-model-step.component.html',
  styleUrls: ['./choose-model-step.component.scss'],
})
export class ChooseModelStepComponent implements OnInit, OnDestroy {
  selectedCarId: number | null;

  cars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  private destroy = new Subject();

  price = new FormControl();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.order$.pipe(take(1)).subscribe((order) => {
      this.selectedCarId = order.carId;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  chooseCar(carId: number): void {
    this.selectedCarId = carId;
    this.orderService.updateOrder({ carId });
  }
}
