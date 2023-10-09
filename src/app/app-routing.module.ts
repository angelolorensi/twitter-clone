import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { IndividualPostComponent } from './components/individual-post/individual-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'post/:postId', component: IndividualPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
