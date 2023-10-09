import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAccDialogComponent } from './components/create-acc-dialog/create-acc-dialog.component';
import { ForgotPasswordDialogComponent } from './components/forgot-password-dialog/forgot-password-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { TokenInterceptor } from './services/token-interceptor/token.interceptor';
import { FirstLoginDialogComponent } from './components/first-login-dialog/first-login-dialog.component';
import { NoSpaceDirective } from './shared/no-space/no-space.directive';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TweetboxComponent } from './components/tweetbox/tweetbox.component';
import { PostComponent } from './components/post/post.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { IndividualPostComponent } from './components/individual-post/individual-post.component';
import { AutoResizeTextareaDirective } from './shared/auto-resize-textarea/auto-resize-textarea.directive';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    LoginDialogComponent,
    CreateAccDialogComponent,
    ForgotPasswordDialogComponent,
    FirstLoginDialogComponent,
    NoSpaceDirective,
    ProfilePageComponent,
    SidebarComponent,
    TweetboxComponent,
    PostComponent,
    WidgetsComponent,
    ConfirmationDialogComponent,
    IndividualPostComponent,
    AutoResizeTextareaDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatCardModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
