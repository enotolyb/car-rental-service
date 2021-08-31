import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../models/response';
import { ApiService } from './api.service';
import { Tariff } from '../models/tariff';

@Injectable({
  providedIn: 'root',
})
export class TariffsService {
  constructor(private api: ApiService) {}

  getRates(): Observable<Tariff[]> {
    return this.api.get<Response<Tariff>>(`rate`).pipe(map((res) => res.data));
  }
}
