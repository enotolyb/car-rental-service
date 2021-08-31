import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city';
import { Response } from '../models/response';
import { Point } from '../models/point';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { YandexGeocodeResult, YandexGeoMemeber } from '../models/yandex-geocode-result';
import { MarkerPoint } from '../models/marker-point';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  cities$ = this.getCities().pipe(shareReplay(1));

  private geocodeCache: { [key: string]: MarkerPoint } = {};

  constructor(private api: ApiService, private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.api.get<Response<City>>(`city`).pipe(map((res) => res.data));
  }

  getPoints(cityId?: string): Observable<Point[]> {
    return this.api
      .get<Response<Point>>(`point`, {
        ...(cityId ? { cityId } : {}),
      })
      .pipe(map((res) => res.data));
  }

  searchWord(query: string): Observable<YandexGeoMemeber[]> {
    const url = 'https://geocode-maps.yandex.ru/1.x';
    return this.http
      .get<YandexGeocodeResult>(url, {
        params: {
          apikey: environment.mapToken,
          geocode: query,
          format: 'json',
        },
      })
      .pipe(map((res) => res.response.GeoObjectCollection.featureMember));
  }

  geocode(id: string, address: string): Observable<MarkerPoint | null> {
    if (this.geocodeCache[id]) {
      return of(this.geocodeCache[id]);
    }

    return this.searchWord(address).pipe(
      map((res) => (res && res.length ? this.convertPoint(res[0]) : null)),
      tap((markerPoint) => {
        this.geocodeCache[id] = markerPoint;
      }),
    );
  }

  private convertPoint(geoMemeber: YandexGeoMemeber): MarkerPoint {
    const position = geoMemeber.GeoObject.Point.pos.split(' ');
    return { lat: +position[1], lng: +position[0] };
  }
}
