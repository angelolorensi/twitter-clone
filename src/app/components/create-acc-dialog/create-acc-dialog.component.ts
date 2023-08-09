import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, _closeDialogVia } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from 'src/app/model/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { countries } from 'src/app/shared/country-codes';
import { UpdatePhone } from 'src/app/model/requests/UpdatePhone';
import { catchError, of, switchMap } from 'rxjs';
import { CodeVerification } from 'src/app/model/requests/CodeVerification';
import { PasswordChange } from 'src/app/model/requests/PasswordChange';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-acc-dialog',
  templateUrl: './create-acc-dialog.component.html',
  styleUrls: ['./create-acc-dialog.component.css'],
})
export class CreateAccDialogComponent implements OnInit {
  //Variables
  registerForm: FormGroup;
  phoneForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;
  years: number[] = [];
  stepCounter: number = 1;
  stepIcon: string = '';
  page1: boolean = true;
  page2: boolean = false;
  page3: boolean = false;
  page4: boolean = false;
  page5: boolean = false;
  username: string = '';
  email: string = '';
  dob: string = '';
  user: User;
  dateToSend: Date = new Date();
  monthConverted: number = 0;
  countryCodes: any[] = countries;
  selectedCode: string = '';
  completePhoneNo: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateAccDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      day: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
    this.user = {
      username: '',
      email: '',
      dob: '',
    };
    this.phoneForm = fb.group({
      countryCode: ['', Validators.required],
      phoneNo: ['', Validators.required],
    });
    this.codeForm = fb.group({
      code: ['', Validators.required],
    });
    this.passwordForm = fb.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.yearSelector();
    this.setStepIcon();
  }

  //add name, email and date of birth to the user account
  onRegister() {
    //convert string date to Date object
    this.monthConverted = this.convertMonthToNumber(
      this.registerForm.value.month
    );
    this.dob =
      this.registerForm.value.year +
      '-' +
      this.monthConverted +
      '-' +
      this.registerForm.value.day;
    const dateObject = new Date(this.dob);
    const serializedDate = dateObject.toISOString();

    //set user input data o a user object
    this.user.dob = serializedDate;
    this.user.email = this.registerForm.value.email;
    this.user.username = this.registerForm.value.username;

    //send user registration request via service
    this.authService.registerUser(this.user).subscribe(
      (data) => {
        this.page2 = false;
        this.page3 = true;
        this.stepCounter++;
      },
      (error) => {
        if ((error.error = 'The username or email you provided is already in use')) {
          this.snackbar.open(
            'Este nome de usuario ou email ja está em uso, tente com um diferente.',
            'fechar'
          );
        }
      }
    );
  }

  //add a phone number to the user account
  onSubmitPhoneNumber() {
    this.completePhoneNo =
      this.phoneForm.value.countryCode + this.phoneForm.value.phoneNo;
    const updatePhone: UpdatePhone = new UpdatePhone(
      this.registerForm.value.username,
      this.completePhoneNo
    );

    this.authService
      .updateUserPhone(updatePhone)
      .pipe(
        switchMap(() =>
          this.authService.sendVerificationEmail(updatePhone).pipe(
            catchError((emailError) => {
              return of(null);
            })
          )
        )
      )
      .subscribe(
        () => {
          this.stepCounter++;
          this.page3 = false;
          this.page4 = true;
        },
        (updateError) => {
          this.snackbar.open('Erro ao registrar telefone', 'fechar');
        }
      );
  }

  //send verification code to email
  sendVerificationCode() {
    const verificationCode = new CodeVerification(
      this.codeForm.value.code,
      this.registerForm.value.username
    );

    this.authService.verifyCode(verificationCode).subscribe(
      (data) => {
        this.page4 = false;
        this.page5 = true;
        this.stepCounter++;
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  //add a password to the account
  changePassword() {
    const changePassword = new PasswordChange(
      this.registerForm.value.username,
      this.passwordForm.value.password
    );

    this.authService.changePassword(changePassword).subscribe(
      (data) => {
        this.dialogRef.close();
        this.snackbar.open("Conta registrada com sucesso, Acesse sua conta para começar a usar", "fechar");
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  //when user input on page 2 is wrong go back to page 1
  onWrongUserDataClicked() {
    this.page1 = false;
    this.page2 = true;
    this.stepCounter--;
    this.setStepIcon();
  }

  //change the close btn to arrow back btn
  private setStepIcon() {
    if (this.stepCounter == 1) {
      this.stepIcon = 'close';
      this.page1 = true;
      this.page2 = false;
    } else if (this.stepCounter == 2) {
      this.stepIcon = 'arrow_back';
      this.page2 = true;
      this.page3 = false;
    } else if (this.stepCounter == 3) {
      this.stepIcon = 'arrow_back';
      this.page3 = true;
      this.page4 = false;
    } else if (this.stepCounter == 4) {
      this.stepIcon = 'arrow_back';
      this.page4 = true;
      this.page5 = false;
    } else if (this.stepCounter == 0) {
      this.dialogRef.close();
    } else {
      this.stepIcon = 'arrow_back';
    }
  }

  onNextBtnClicked() {
    if (this.registerForm.valid) {
      //set user input data from page 1 to page 2 for confirmation
      this.username = this.registerForm.value.username;
      this.email = this.registerForm.value.email;
      this.dob =
        this.registerForm.value.day +
        ' de ' +
        this.registerForm.value.month +
        ' de ' +
        this.registerForm.value.year;
      //change page
      this.page1 = false;
      this.page2 = true;
      this.stepCounter++;
      this.setStepIcon();
    } else {
      return;
    }
  }

  onStepBtnClicked() {
    if (this.stepCounter > 0) {
      this.stepCounter = this.stepCounter - 1;
      this.setStepIcon();
    } else {
      this.stepCounter = 1;
    }
  }

  private yearSelector() {
    const currentYear = new Date().getFullYear();
    const startYear = 1903;
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
    this.years.reverse();
  }

  private convertMonthToNumber(month: string): number {
    if (month == 'Janeiro') {
      return 1;
    } else if (month == 'Fevereiro') {
      return 2;
    } else if (month == 'Março') {
      return 3;
    } else if (month == 'Abril') {
      return 4;
    } else if (month == 'Maio') {
      return 5;
    } else if (month == 'Junho') {
      return 6;
    } else if (month == 'Julho') {
      return 7;
    } else if (month == 'Agosto') {
      return 8;
    } else if (month == 'Setembro') {
      return 9;
    } else if (month == 'Outubro') {
      return 10;
    } else if (month == 'Novembro') {
      return 11;
    } else if (month == 'Dezembro') {
      return 12;
    } else {
      return 0;
    }
  }
}
