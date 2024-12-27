import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { AppSharedService, BreadcrumbsService, UnsplashService } from '@app/services';

// toDo Is there a way to improve the rendering strategy in this component?
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatCardModule, MatIconModule],
})
export class PhotoComponent implements OnInit {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly appSharedService: AppSharedService = inject(AppSharedService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly breadcrumbService: BreadcrumbsService = inject(BreadcrumbsService);

  public photo = signal<IPhoto | null>(null);
  readonly loaded = signal<boolean>(false);

  ngOnInit(): void {
    const photoId = this.activatedRoute.snapshot.params['photoId'];
    this.appSharedService.startLoading();
    this.unsplashService.getPhoto<IPhoto>(photoId).subscribe( {
      next: api_response => {
        if (!api_response.response) {
          console.error('Error fetching photo');
          return;
        }
        const photo = api_response.response;
        photo.description = this.capitalize(photo.description || '')
        this.photo.set(photo);
        this.loaded.set(true)
        this.appSharedService.stopLoading();
      },
        error: err => {
          console.error('Error fetching photo: ', err)
          this.appSharedService.stopLoading();
        }
    });

    this.breadcrumbService.addBreadcrumb({label: 'Photo', url: '', level: 2})
  }

  handleGotoCollection() {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId]);
  }

  private capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
