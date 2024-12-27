import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from '@app/interfaces';
import { BreadcrumbsService } from '@app/services';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatCardModule, MatIconModule],
})
export class BreadcrumbsComponent {
  public breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbsService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

  ngOnInit() {}
}
