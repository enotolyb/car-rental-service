import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        },
  ): Observable<T> {
    return this.http.get<T>(environment.apiFactory + url, {
      headers: {
        'X-Api-Factory-Application-Id': environment.token,
      },
      params,
    });
  }
}
