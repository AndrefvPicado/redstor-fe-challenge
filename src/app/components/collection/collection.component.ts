import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { AppSharedService, BreadcrumbsService, UnsplashService } from '@app/services';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatCardModule, MatIconModule, NgxMasonryModule, InfiniteScrollDirective],

})
export class CollectionComponent implements OnInit, OnDestroy {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly appSharedService: AppSharedService = inject(AppSharedService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly breadcrumbService: BreadcrumbsService = inject(BreadcrumbsService);
  private destroy$ = new Subject<void>();
  private currentPage = 1;
  readonly photos$: BehaviorSubject<IPhoto[]> = new BehaviorSubject<IPhoto[]>([]);

  ngOnInit(): void {
    this.fetchData();
    this.breadcrumbService.addBreadcrumb({label: 'Collections', url: '/', level: 0})
    this.breadcrumbService.addBreadcrumb({label: 'Collection', url: '', level: 1})
  }
  
  private fetchData(){
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    this.appSharedService.startLoading();
    this.unsplashService.listCollectionPhotos(collectionId, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe(photos => {
        const currentPhotos = this.photos$.getValue();
        const newPhotos = photos?.response?.results || [];
        this.photos$.next([...currentPhotos, ...newPhotos]);
        this.appSharedService.stopLoading();
    });
  }

  ngOnDestroy(): void {
    this.breadcrumbService.removeBreadcrumb({label: 'Collection', url: '', level: 1})
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  handleGotoCollection() {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId]);
  }
  
  handleGotoPhoto(photo: IPhoto) {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId, 'photo', photo.id]);
  }

  onScroll(){
    this.currentPage++;
    this.fetchData();
  }
}
