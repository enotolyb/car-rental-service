import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject(true);

  isLoading$ = this.loading.asObservable();

  showLoader(): void {
    this.loading.next(true);
  }

  hideLoader(): void {
    this.loading.next(false);
  }
}
