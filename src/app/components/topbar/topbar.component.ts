import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '@app/services/darkMode.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule],
  
})
export class TopbarComponent {
  private readonly darkModeService: DarkModeService = inject(DarkModeService);
  darkMode$: Observable<boolean> = new BehaviorSubject(false);

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.darkMode$ = this.darkModeService.darkMode$;
  }
}