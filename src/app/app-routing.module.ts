import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'collection/:collectionId', loadComponent: () => import('./components/collection/collection.component').then(m => m.CollectionComponent)  },
  { path: 'collection/:collectionId/photo/:photoId', loadComponent: () => import('./components/photo/photo.component').then(m => m.PhotoComponent)  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
