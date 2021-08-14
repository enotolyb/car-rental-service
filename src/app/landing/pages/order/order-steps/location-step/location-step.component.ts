import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { OrderService } from '../../../../services/order.service';
import { City } from '../../../../models/city';
import { Point } from '../../../../models/point';
import { LocationService } from '../../../../services/location.service';
import { MarkerPoint } from '../../../../models/marker-point';
import { UlyanovskPoint } from './const';

@Component({
  selector: 'app-location-step',
  templateUrl: './location-step.component.html',
  styleUrls: ['./location-step.component.scss'],
})
export class LocationStepComponent implements OnInit, OnDestroy {
  cities$: Observable<City[]>;

  points$: Observable<Point[]>;

  mapCenter$: Observable<MarkerPoint>;

  mapPoints$: Observable<MarkerPoint[]>;

  form = this.formBuilder.group({
    cityId: ['', Validators.required],
    pointId: ['', Validators.required],
  });

  private destroy = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private locationService: LocationService,
  ) {}

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

    this.cities$ = combineLatest([
      this.form.get('cityId').valueChanges.pipe(startWith('')),
      this.locationService.cities$,
    ]).pipe(
      map(([city, cities]) => {
        if (typeof city === 'string') {
          const search = city.toLowerCase();
          return cities.filter((it) => it.name.toLowerCase().includes(search));
        }

        return cities;
      }),
    );

    const allPoints$ = this.form.get('cityId').valueChanges.pipe(
      startWith(this.form.getRawValue().cityId),
      switchMap((cityId) => (cityId && cityId.id ? this.locationService.getPoints(cityId.id) : [])),
    );

    this.points$ = combineLatest([
      this.form.get('pointId').valueChanges.pipe(startWith('')),
      allPoints$,
    ]).pipe(
      map(([point, points]) => {
        if (typeof point === 'string') {
          const search = point.toLowerCase();
          return points.filter((it) => it.name.toLowerCase().includes(search));
        }

        return points;
      }),
    );

    this.mapCenter$ = combineLatest([
      this.form.get('cityId').valueChanges.pipe(startWith(this.form.get('cityId').value)),
      this.form.get('pointId').valueChanges.pipe(startWith(this.form.get('pointId').value)),
    ]).pipe(
      switchMap(([city, point]) => {
        if (point && point.address) {
          return this.locationService.geocode(
            point.id,
            (point.cityId ? point.cityId.name + ' ' : '') + point.address,
          );
        }

        if (city) {
          return this.locationService.geocode(city.id, city.name);
        }

        return of(UlyanovskPoint);
      }),
    );

    this.mapPoints$ = this.points$.pipe(
      switchMap((points) =>
        points && points.length
          ? combineLatest([
              ...points.map((point) =>
                this.locationService.geocode(
                  point.id,
                  (point.cityId ? point.cityId.name + ' ' : '') + point.address,
                ),
              ),
            ])
          : of([]),
      ),
    );

    this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe((value) => {
      if (value.pointId) {
        if (
          (value.pointId.cityId && value.pointId.cityId.id) !== (value.cityId && value.cityId.id)
        ) {
          this.form.get('pointId').patchValue(null);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  displayCityFn(city: City): string {
    return city && city.name ? city.name : '';
  }

  displayPointFn(point: Point): string {
    return point && point.name ? point.name : '';
  }
}
