import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
// import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
// // import { AnimalListComponent } from './animal-list/animal-list.component';
// import { SeoService } from './seo.service';
import { ArtistComponent } from './artist/artist.component'; 
// import { PasswordlessAuthComponent } from './passwordless-auth/passwordless-auth.component';
import { CoreModule } from './core/core.module';
import { UiModule } from './ui/ui.module';
@NgModule({
  declarations: [
    AppComponent,
    // PasswordlessAuthComponent,
    ArtistComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserTransferStateModule,
    AppRoutingModule,
    CoreModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
