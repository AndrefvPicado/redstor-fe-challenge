import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { ICollection } from '@app/interfaces';
import { AppSharedService, BreadcrumbsService, UnsplashService } from '@app/services';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatCardModule, NgxMasonryModule, InfiniteScrollDirective]
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly appSharedService: AppSharedService = inject(AppSharedService);
  private readonly breadcrumbService: BreadcrumbsService = inject(BreadcrumbsService);
  private readonly router: Router = inject(Router);
  private currentPage: number = 1;
  private destroy$ = new Subject<void>();
  collections: ICollection[] = [];

  ngOnInit(): void {
    this.fetchData();
    this.breadcrumbService.addBreadcrumb({label: 'Collections', url: '', level: 0})
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onScroll(){
    this.currentPage++;
    this.fetchData();
  }

  private fetchData(){
    this.appSharedService.startLoading();
    this.unsplashService.listCollections(this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe(collections => {
      this.collections = this.collections.concat(collections?.response?.results || []);
      this.appSharedService.stopLoading();
    });
  }

  public collectionClicked(collection: ICollection){
    this.breadcrumbService.addBreadcrumb({label: collection.title, url: '', level: 1})

    const collectionId = collection.id;
    return this.router.navigate(['collection', collectionId]);
  }
}
