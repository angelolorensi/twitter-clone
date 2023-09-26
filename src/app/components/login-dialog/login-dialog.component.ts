import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CreateAccDialogComponent } from '../create-acc-dialog/create-acc-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Login } from 'src/app/model/requests/Login';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;
  emailInput: boolean = true;
  passwordInput: boolean = false;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private dialog:MatDialog,
              private fb: FormBuilder,
              private authService:AuthenticationService,
              private router:Router) {
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  nextBtn(){
    this.emailInput = false;
    this.passwordInput = true;
  }

  loginBtn(){
    const login = new Login(this.loginForm.value.email, this.loginForm.value.password);
    this.authService.login(login).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/home')
        this.dialogRef.close();
      },
      error => {
        this.loginForm.get('password')?.setErrors({invalidCredentials : true});
      }
    )
  }

  createAccBtn(){
    this.dialog.open(CreateAccDialogComponent, {
      panelClass: 'dialog',
    });
  }

  forgotPassword(){
    this.dialog.open(ForgotPasswordDialogComponent, {
      panelClass: 'dialog',
    })
  }

}
