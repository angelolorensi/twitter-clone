import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { IndividualPostComponent } from './components/individual-post/individual-post.component';

const routes: Routes = [
  { path: 'login', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'post/:postId', component: IndividualPostComponent },
  { path: 'profile', component:ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
