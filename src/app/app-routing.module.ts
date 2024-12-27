import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, CollectionComponent, PhotoComponent } from './components';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'collection/:collectionId', loadChildren: () => import('./components/collection/collection.module').then(m => m.CollectionModule)  },
  { path: 'collection/:collectionId/photo/:photoId', loadChildren: () => import('./components/photo/photo.module').then(m => m.PhotoModule)  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
