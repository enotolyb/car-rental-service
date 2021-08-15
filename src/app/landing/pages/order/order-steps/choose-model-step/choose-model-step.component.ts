import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, startWith, switchMap, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OrderService } from '../../../../services/order.service';
import { Car } from '../../../../models/car';
import { CarService } from '../../../../services/car.service';
import { categories } from './const';

@Component({
  selector: 'app-choose-model-step',
  templateUrl: './choose-model-step.component.html',
  styleUrls: ['./choose-model-step.component.scss'],
})
export class ChooseModelStepComponent implements OnInit, OnDestroy {
  cars$: Observable<Car[]>;

  categories = categories;

  selectedCarId: number | null;

  private destroy = new Subject();

  categoryControl = new FormControl();

  constructor(private orderService: OrderService, private carService: CarService) {}

  ngOnInit(): void {
    this.orderService.order$.pipe(take(1)).subscribe((order) => {
      this.selectedCarId = order.carId.id;
    });

    this.cars$ = this.categoryControl.valueChanges.pipe(
      startWith(null),
      switchMap((categoryId) => this.carService.getCars(categoryId)),
      map((response) => response.data),
    );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  chooseCar(car: Car): void {
    this.selectedCarId = car.id;
    this.orderService.updateOrder({ carId: car });
  }
}
