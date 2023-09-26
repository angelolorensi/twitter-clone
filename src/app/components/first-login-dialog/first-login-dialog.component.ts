import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-first-login-dialog',
  templateUrl: './first-login-dialog.component.html',
  styleUrls: ['./first-login-dialog.component.css']
})
export class FirstLoginDialogComponent implements OnInit {

  token: string | null ='';

  //steps
  page1: boolean = true;
  page2: boolean = false;

  //image variables
  selectedImage!: File;
  imageUrl: string | ArrayBuffer | null | undefined = '/assets/img/select_image_icon.png';
  showImage: boolean = true;

  //form
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FirstLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private userService: UserService,
    private router: Router) {
    this.form = fb.group({
      username: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.form.get('username')?.setValue(this.data.user.username);
  }

  handleImageSelected(event: any) {
    this.showImage = true;
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedImage = selectedFile;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  changeProfilePicture(){
    this.userService.changeProfilePicture(this.selectedImage).subscribe(
      data => {
        this.page1 = false;
        this.page2 = true;
        this.userService.removeFirstTime().subscribe();
      }
    );
  }

  changeUsername(){
    this.userService.updateUsername(this.form.value.username).subscribe(
      data => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        this.dialogRef.close();
      }
    );
  }

}
