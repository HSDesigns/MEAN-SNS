import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AngularFireAuthModule } from 'angularfire2/auth';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NotifyService } from './notify.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service'
@NgModule({
  imports: [
    HttpClientModule
  ],
  // declarations: [],
  providers: [AuthService, AuthGuard, NotifyService, HttpErrorHandler,]
})
export class CoreModule { }
