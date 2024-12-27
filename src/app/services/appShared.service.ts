import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSharedService {
  readonly isLoading = signal(false);

  startLoading() {
    this.isLoading.set(true);
  }

  stopLoading() {
    this.isLoading.set(false);
  }
}