import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OrderService } from '../../../../services/order.service';
import { Car } from '../../../../models/car';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-choose-model-step',
  templateUrl: './choose-model-step.component.html',
  styleUrls: ['./choose-model-step.component.scss'],
})
export class ChooseModelStepComponent implements OnInit, OnDestroy {
  cars$: Observable<Car[]>;

  selectedCarId: number | null;

  private destroy = new Subject();

  price = new FormControl();

  constructor(private orderService: OrderService, private carService: CarService) {}

  ngOnInit(): void {
    this.orderService.order$.pipe(take(1)).subscribe((order) => {
      this.selectedCarId = order.carId;
    });

    this.cars$ = this.carService.getCars().pipe(map((response) => response.data));
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
