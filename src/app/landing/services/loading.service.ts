import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading$ = new BehaviorSubject(false);

  isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  showLoader(): void {
    this.loading$.next(true);
  }

  hideLoader(): void {
    this.loading$.next(false);
  }
}
