import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CarResponse } from '../models/car-response';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private api: ApiService) {}

  getCars(categoryId?: string): Observable<CarResponse> {
    return this.api.get<CarResponse>(`car`, {
      limit: '20',
      ...(categoryId ? { categoryId } : {}),
    });
  }
}
