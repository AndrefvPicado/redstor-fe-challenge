import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatCardModule, NgxMasonryModule, InfiniteScrollDirective],
  exports: [HomeComponent]
})
export class HomeModule {}
