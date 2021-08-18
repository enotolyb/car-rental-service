import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Response } from '../models/response';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private api: ApiService) {}

  getCars(categoryId?: string): Observable<Car[]> {
    return this.api
      .get<Response<Car>>(`car`, {
        ...(categoryId ? { categoryId } : {}),
      })
      .pipe(
        map((data) => data.data),
        map((list) => this.convertList(list)),
      );
  }

  convertList(list) {
    return list.map((item) => ({
      ...item,
      thumbnail: {
        ...item.thumbnail,
        path: item.thumbnail.path.includes('/files/')
          ? 'https://api-factory.simbirsoft1.com/' + item.thumbnail.path
          : item.thumbnail.path,
      },
    }));
  }
}
