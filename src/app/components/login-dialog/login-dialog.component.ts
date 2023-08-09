import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CreateAccDialogComponent } from '../create-acc-dialog/create-acc-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Login } from 'src/app/model/requests/Login';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;
  usernameInput: boolean = true;
  passwordInput: boolean = false;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private dialog:MatDialog,
              private fb: FormBuilder,
              private authService:AuthenticationService,
              private router:Router) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  nextBtn(){
    this.usernameInput = false;
    this.passwordInput = true;
  }

  loginBtn(){
    const login = new Login(this.loginForm.value.username, this.loginForm.value.password);
    this.authService.login(login).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/home')
        this.dialogRef.close();
      },
      error => {
        console.log(error);

      }
    )
  }

  createAccBtn(){
    this.dialog.open(CreateAccDialogComponent, {
      panelClass: 'dialog',
    });
  }

}
