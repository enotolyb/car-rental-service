import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { combineLatest, forkJoin, Observable, of, Subject } from 'rxjs';
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
  private destroy = new Subject();

  form = this.formBuilder.group({
    cityId: ['', Validators.required],
    pointId: ['', Validators.required],
  });

  cities$: Observable<City[]>;

  points$: Observable<Point[]>;

  mapCenter$: Observable<MarkerPoint>;

  mapPoints$: Observable<MarkerPoint[]>;

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

    this.cities$ = this.getCities();

    this.points$ = this.getPoints();

    this.mapCenter$ = combineLatest([
      this.form.get('cityId').valueChanges.pipe(startWith(this.form.get('cityId').value)),
      this.form.get('pointId').valueChanges.pipe(startWith(this.form.get('pointId').value)),
    ]).pipe(
      switchMap(([city, point]) => {
        if (point?.address) {
          return this.locationService.geocode(
            point.id,
            `${point.cityId ? point.cityId.name : ''} ${point.address}`,
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
        points?.length ? forkJoin([...points.map((point) => this.geocodeForPoint(point))]) : of([]),
      ),
    );

    this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe((value) => {
      if (value.pointId && typeof value.pointId !== 'string') {
        if (value.pointId.cityId?.id !== value.cityId?.id) {
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
    return city?.name ? city.name : '';
  }

  displayPointFn(point: Point): string {
    return point?.name ? point.name : '';
  }

  getCities(): Observable<City[]> {
    return combineLatest([
      this.form.get('cityId').valueChanges.pipe(startWith('')),
      this.locationService.cities$,
    ]).pipe(map(([city, cities]) => this.filterBySearchValue<City>(cities, city)));
  }

  getPoints(): Observable<Point[]> {
    const allPoints$: Observable<Point[]> = this.form.get('cityId').valueChanges.pipe(
      startWith(this.form.getRawValue().cityId),
      switchMap((cityId) => (cityId?.id ? this.locationService.getPoints(cityId.id) : [])),
    );

    return combineLatest([
      this.form.get('pointId').valueChanges.pipe(startWith('')),
      allPoints$,
    ]).pipe(map(([point, points]) => this.filterBySearchValue<Point>(points, point)));
  }

  geocodeForPoint(point: Point): Observable<MarkerPoint | null> {
    return this.locationService.geocode(
      point.id,
      `${point.cityId ? point.cityId.name : ''} ${point.address}`,
    );
  }

  private filterBySearchValue<T extends { name: string }>(items: T[], item?: string): T[] {
    if (typeof item === 'string') {
      const search = item.toLowerCase();
      return items.filter((it) => it.name.toLowerCase().includes(search));
    }
    return items;
  }
}
