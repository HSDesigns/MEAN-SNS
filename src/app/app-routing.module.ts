import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
// import { AnimalListComponent } from './animal-list/animal-list.component'
// import { AnimalDetailComponent } from './animal-detail/animal-detail.component'
import { ArtistComponent } from './artist/artist.component'; 
import { HomePageComponent } from './ui/home-page/home-page.component';
import { UserFormComponent } from './ui/user-form/user-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'artist', component: ArtistComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
