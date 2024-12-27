import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { AppSharedService, BreadcrumbsService, UnsplashService } from '@app/services';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit, OnDestroy {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly appSharedService: AppSharedService = inject(AppSharedService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly breadcrumbService: BreadcrumbsService = inject(BreadcrumbsService);
  private destroy$ = new Subject<void>();
  
  readonly photos$: BehaviorSubject<IPhoto[]> = new BehaviorSubject<IPhoto[]>([]);

  ngOnInit(): void {
    this.appSharedService.startLoading();
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];

    this.unsplashService.listCollectionPhotos(collectionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(photos => {
      this.photos$.next(photos?.response?.results || []);
      this.appSharedService.stopLoading();
    });

    this.breadcrumbService.addBreadcrumb({label: 'Collections', url: '/', level: 0})
    this.breadcrumbService.addBreadcrumb({label: 'Collection', url: '', level: 1})

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
}
