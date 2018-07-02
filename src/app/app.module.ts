import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

 
// import { AngularFirestoreModule } from 'angularfire2/firestore';

// import { AngularFireStorageModule } from 'angularfire2/storage';

// import { PasswordlessAuthComponent } from './passwordless-auth/passwordless-auth.component';
import { CoreModule } from './core/core.module';
import { UiModule } from './ui/ui.module';
// import { UploadsModule } from './uploads/uploads.module';
@NgModule({
  declarations: [
    AppComponent,
    // PasswordlessAuthComponent,
  ],
  imports: [ 
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserTransferStateModule,
    AppRoutingModule,
    CoreModule,
    UiModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,
    AngularFireAuthModule
    // AngularFireStorageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
