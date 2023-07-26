import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, _closeDialogVia } from '@angular/material/dialog';
import { RegisterService } from 'src/app/services/register/register.service';
import { User } from 'src/app/model/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { countries } from 'src/app/shared/country-codes'
import { UpdatePhone } from 'src/app/model/UpdatePhone';

@Component({
  selector: 'app-create-acc-dialog',
  templateUrl: './create-acc-dialog.component.html',
  styleUrls: ['./create-acc-dialog.component.css'],
})
export class CreateAccDialogComponent implements OnInit {
  registerForm: FormGroup;
  phoneForm: FormGroup;
  years: number[] = [];
  stepCounter: number = 1;
  stepIcon: string = '';
  page1: boolean = true;
  page2: boolean = false;
  page3: boolean = false;
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
    private registerService: RegisterService,
    private snackbar: MatSnackBar
  ) {
    this.registerForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      day: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
    this.user = {
      name: '',
      email: '',
      dob: '',
    };
    this.phoneForm = fb.group({
      countryCode: ['', Validators.required],
      phoneNo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.yearSelector();
    this.setStepIcon();
  }

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
    this.user.name = this.registerForm.value.name;

    //send user registration request via service
    this.registerService.registerUser(this.user).subscribe(
      (data) => {
        this.page2 = false;
        this.page3 = true;
        this.stepCounter++;
      },
      (error) => {
        if ((error.error = 'The email provided is already taken')) {
          this.snackbar.open(
            'Este email ja está em uso, tente com um diferente.',
            'fechar'
          );
        }
      }
    );
  }

  onSubmitPhoneNumber() {
    this.completePhoneNo =this.phoneForm.value.countryCode + this.phoneForm.value.phoneNo;
    const updatePhone: UpdatePhone = new UpdatePhone(this.registerForm.value.name, this.completePhoneNo);
    this.registerService.updateUserPhone(updatePhone).subscribe(
      (data) => {
        this.registerService.sendVerificationEmail(updatePhone).subscribe(
          (data) => {},
          (error) => {
            this.snackbar.open(
              'Falha ao enviar o email!, tente novamente',
              'fechar'
            );
          }
        );
      },
      (error) => {
        this.snackbar.open('Erro ao registrar telefone','fechar');
      }
    );

  }

  onNextBtnClicked() {
    if (this.registerForm.valid) {
      //set user input data from page 1 to page 2 for confirmation
      this.username = this.registerForm.value.name;
      this.email = this.registerForm.value.email;
      this.dob =this.registerForm.value.day + ' de ' +this.registerForm.value.month + ' de ' +this.registerForm.value.year;
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
    } else if (this.stepCounter == 0) {
      this.dialogRef.close();
    } else {
      this.stepIcon = 'arrow_back';
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

