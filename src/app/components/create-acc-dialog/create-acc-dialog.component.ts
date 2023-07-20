import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, _closeDialogVia } from '@angular/material/dialog';

@Component({
  selector: 'app-create-acc-dialog',
  templateUrl: './create-acc-dialog.component.html',
  styleUrls: ['./create-acc-dialog.component.css'],
})
export class CreateAccDialogComponent implements OnInit {
  form: FormGroup;
  years: number[] = [];
  stepCounter: number = 1;
  stepIcon: string = '';
  page1: boolean = true;
  page2: boolean = false;
  page3: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateAccDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dia: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      ano: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.yearSelector();
    this.setStepIcon();
  }

  onNextBtnClicked(){
    this.page1 = false;
    this.page2 = true;
    this.stepCounter++;
    this.setStepIcon();
  }

  onStepBtnClicked() {
    if (this.stepCounter > 0) {
      this.stepCounter = this.stepCounter - 1;
      this.setStepIcon();
    } else {
      this.stepCounter = 1;
    }
  }

  setStepIcon() {
    if (this.stepCounter == 1) {
      this.stepIcon = 'close';
    } else if (this.stepCounter == 0) {
      this.dialogRef.close();
    } else {
      this.stepIcon = 'arrow_back';
    }
  }

  yearSelector() {
    const currentYear = new Date().getFullYear();
    const startYear = 1903;
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
    this.years.reverse();
  }
}
