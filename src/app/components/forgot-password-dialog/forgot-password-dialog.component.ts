import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css'],
})
export class ForgotPasswordDialogComponent implements OnInit {
  part1: boolean = true;
  part2: boolean = false;
  part3: boolean = false;
  resetPasswdForm: FormGroup;
  codeForm: FormGroup;
  newPasswdForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>
  ) {
    this.resetPasswdForm = fb.group({
      username: ['', Validators.required],
    });

    this.codeForm = fb.group({
      code: ['', Validators.required],
    });

    this.newPasswdForm = fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      {
        validator: this.passwordMatchValidator('newPassword','confirmPassword'),
      }
    );
  }

  ngOnInit(): void {}

  getCodeBtn() {
    if (!this.resetPasswdForm.valid) {
      return;
    }
    this.authService
      .getResetPasswdCode(this.resetPasswdForm.value.username)
      .subscribe(
        (data) => {
          this.part1 = false;
          this.part2 = true;
        },
        (error) => {
          this.resetPasswdForm
            .get('username')
            ?.setErrors({ noUserFoundError: true });
        }
      );
  }

  verifyCode() {
    if (!this.codeForm.valid) {
      return;
    }
    this.authService.sendResetPasswdCode(this.codeForm.value.code).subscribe(
      (data) => {
        this.part2 = false;
        this.part3 = true;
      },
      (error) => {
        this.codeForm.get('code')?.setErrors({ wrongCodeError: true });
      }
    );
  }

  sendNewPassword() {
    if (!this.newPasswdForm.valid) {
      return;
    }
    const passwordChange = {
      username: this.resetPasswdForm.value.username,
      password: this.newPasswdForm.value.newPassword
    };
    this.authService.changePassword(passwordChange).subscribe(
      (data) => {
        alert('Senha alterada com sucesso!');
        this.dialogRef.close();
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        return confirmPasswordControl.setErrors(null);
      }
    };
  }
}
