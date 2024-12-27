import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({  providedIn: 'root'})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {}

  toggleDarkMode(): void {
    const currentMode = this.darkModeSubject.value;
    this.setDarkMode(!currentMode);
  }

  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    this.applyDarkMode(isDark);
  }

  private applyDarkMode(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
