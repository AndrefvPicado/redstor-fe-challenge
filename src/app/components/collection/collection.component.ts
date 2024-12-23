import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { BreadcrumbsService, UnsplashService } from '@app/services';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly breadcrumbService: BreadcrumbsService = inject(BreadcrumbsService);

  readonly photos$: BehaviorSubject<IPhoto[]> = new BehaviorSubject<IPhoto[]>([]);
  // toDo Is there another way using new Angular features to replace rjxs
  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.isLoading$.next(true);
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];

    this.unsplashService.listCollectionPhotos(collectionId).subscribe(photos => {
      this.photos$.next(photos?.response?.results || []);
      this.isLoading$.next(false);
    });

    this.breadcrumbService.addBreadcrumb({label: 'Collections', url: '/', level: 0})
    this.breadcrumbService.addBreadcrumb({label: 'Collection', url: '', level: 1})

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
