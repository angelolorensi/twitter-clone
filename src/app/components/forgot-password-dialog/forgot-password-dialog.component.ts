import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChange } from 'src/app/model/requests/PasswordChange';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {

  part1: boolean = true;
  part2: boolean = false;
  part3: boolean = false;
  resetPasswdForm: FormGroup;
  codeForm: FormGroup;
  newPasswdForm: FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {

    this.resetPasswdForm = fb.group({
      username:['', Validators.required]
    })

    this.codeForm = fb.group({
      code:['', Validators.required]
    })

    this.newPasswdForm = fb.group({
      newPassword:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  getCodeBtn(){
    this.authService.getResetPasswdCode(this.resetPasswdForm.value.username).subscribe(
      data => {
        this.part1 = false;
        this.part2 = true;
      },
      error => {
        alert(error.error)
      }
    )
  }

  verifyCode(){
    this.authService.sendResetPasswdCode(this.codeForm.value.code).subscribe(
      data => {
        this.part2 = false;
        this.part3 = true
      },
      error => {
        alert(error.error)
      }
    )
  }

  sendNewPassword(){
    const data = new PasswordChange(this.resetPasswdForm.value.username, this.newPasswdForm.value.newPassword);
    this.authService.changePassword(data).subscribe(
      data => {
        alert("password updated")
        this.router.navigateByUrl("/login")
      },
      error => {
        alert(error.error)
      }
    );
  }

}
