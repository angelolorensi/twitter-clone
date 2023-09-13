import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { CreateAccDialogComponent } from '../create-acc-dialog/create-acc-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  loginBtn(){
    const token = localStorage.getItem('token');
    if(token !== null){
      this.authService.userLoggedIn().subscribe(
        data => {
          this.router.navigateByUrl('/home')
        },
        error => {
          this.dialog.open(LoginDialogComponent,{
            panelClass:'dialog'
          })
        }
      )
    } else {
      this.dialog.open(LoginDialogComponent,{
        panelClass:'dialog'
      })
    }
  }

  createAccBtn(){
    this.dialog.open(CreateAccDialogComponent, {
      panelClass: 'dialog',
    });
  }
}
