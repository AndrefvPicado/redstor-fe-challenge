import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollectionsEffects, metaReducers, reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@environments/environment';
import { NgxMasonryModule } from 'ngx-masonry';
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CollectionComponent } from './components/collection/collection.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TopbarComponent,
    CollectionComponent,
    BreadcrumbsComponent,
    NgxMasonryModule,
    LoadingBarComponent,
    // Store
    // toDo Is there a way to load the store just for the module or component in use?
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([CollectionsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
