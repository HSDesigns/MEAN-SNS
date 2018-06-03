import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SeoService } from '../core/seo.service';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
    HomePageComponent,
    MainNavComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent,
  ],
  exports: [
    MainNavComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent
  ],
  providers: [SeoService]
})
export class UiModule {}
