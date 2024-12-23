import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatCardModule, MatIconModule],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule {}
