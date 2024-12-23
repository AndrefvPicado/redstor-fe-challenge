import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { UnsplashService } from '@app/services';
import { BehaviorSubject, Observable, map } from 'rxjs';

// toDo Is there a way to improve the rendering strategy in this component?
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html'
})
export class PhotoComponent implements OnInit {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  readonly photo$: BehaviorSubject<IPhoto> = new BehaviorSubject<IPhoto>({} as IPhoto);
  readonly isLoading$: Observable<boolean> = this.photo$.pipe(map(p => !p));

  ngOnInit(): void {
    const photoId = this.activatedRoute.snapshot.params['photoId'];

    this.unsplashService.getPhoto<IPhoto>(photoId).subscribe( {
      next: api_response => {
        if (!api_response.response) {
          console.error('Error fetching photo');
          return;
        }
        const photo = api_response.response;
        photo.description = this.capitalize(photo.description || '')
        this.photo$.next(photo);
      },
        error: err => {
          console.error('Error fetching photo: ', err)
        }
    });
  }

  handleGotoCollection() {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId]);
  }

  private capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
