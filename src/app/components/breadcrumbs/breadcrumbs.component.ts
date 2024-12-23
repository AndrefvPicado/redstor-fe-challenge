import { Component } from '@angular/core';
import { Breadcrumb } from '@app/interfaces';
import { BreadcrumbsService } from '@app/services';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
  public breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbsService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

  ngOnInit() {}
}
