import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { CollectionComponent } from './collection.component';

@NgModule({
  declarations: [CollectionComponent],
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatCardModule, MatIconModule],
  exports: [CollectionComponent]
})
export class CollectionModule {}
