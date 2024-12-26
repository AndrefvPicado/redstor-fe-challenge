import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ICollection } from '@app/interfaces';
import { BreadcrumbsService, UnsplashService } from '@app/services';

// toDo Transform this module in a standalone component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly breadcrumbService: BreadcrumbsService = inject(BreadcrumbsService);
  private currentPage: number = 1;
  
  // toDo Why the changes are not reflected in the UI?
  isLoading: boolean = false;
  collections: ICollection[] = [];

  ngOnInit(): void {


    this.fetchData();
    this.breadcrumbService.addBreadcrumb({label: 'Collections', url: '', level: 0})
  }

  onScroll(){
    this.currentPage++;
    this.fetchData();
  }

  private fetchData(){
    // toDo Improve this call using the store (ngrx)
    // toDo What's happening with this subscription in case the component is destroyed?
    // toDo Is there another way to do this operation?
    // toDo Could we add a pagination?
    this.isLoading = true;
    this.unsplashService.listCollections(this.currentPage).subscribe(collections => {
      this.collections = this.collections.concat(collections?.response?.results || []);
      this.isLoading = false;
    });
  }
}
