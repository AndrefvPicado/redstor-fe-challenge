import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { CollectionComponent } from './collection.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [CollectionComponent],
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatCardModule, MatIconModule, NgxMasonryModule, InfiniteScrollDirective],
  exports: [CollectionComponent]
})
export class CollectionModule {}
