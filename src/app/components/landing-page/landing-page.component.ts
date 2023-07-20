import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { CreateAccDialogComponent } from '../create-acc-dialog/create-acc-dialog.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  loginBtn(){
    this.dialog.open(LoginDialogComponent,{
      panelClass:'dialog'
    })
  }

  createAccBtn(){
    this.dialog.open(CreateAccDialogComponent, {
      panelClass: 'dialog',
    });
  }
}
