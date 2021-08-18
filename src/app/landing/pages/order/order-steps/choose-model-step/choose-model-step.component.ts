import { Component, OnDestroy, OnInit } from '@angular/core';
import { startWith, switchMap, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OrderService } from '../../../../services/order.service';
import { Car } from '../../../../models/car';
import { CarService } from '../../../../services/car.service';
import { categories } from './const';
import { LoadingService } from '../../../../services/loading.service';

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

  constructor(
    private orderService: OrderService,
    private carService: CarService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.orderService.order$.pipe(take(1)).subscribe((order) => {
      this.selectedCarId = order.carId;
    });

    this.cars$ = this.categoryControl.valueChanges.pipe(
      startWith(null),
      switchMap((categoryId) => this.carService.getCars(categoryId)),
    );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  chooseCar(carId: number): void {
    this.selectedCarId = carId;
    this.orderService.updateOrder({ carId });
  }

  isLoading(): Observable<boolean> {
    return this.loadingService.isLoading$;
  }
}
