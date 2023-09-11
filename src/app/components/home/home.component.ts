import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //header style variables
  fyHeader: string = 'background-color: #252525;  border-bottom: 2px solid #1672b0';
  followingHeader: string = '';

  //data variables
  token:string | null = '';
  username:string | null  = '';
  nickname:string | null = '';
  email:string | null = '';
  dob:string | null = '';
  phone:string | null = '';

  selectedImage: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;

  constructor(
    private router:Router,
    private authService:AuthenticationService
  ) {
  }

  ngOnInit(): void {
    //check if logged in
    this.loadData();
  }

  getSelectedHeader(header: string){
    if(header == 'For You'){
      this.fyHeader = 'background-color: #252525;  border-bottom: 2px solid #1672b0';
      this.followingHeader = '';
    }
    if(header == 'Following'){
      this.followingHeader = 'background-color: #252525;  border-bottom: 2px solid #1672b0';
      this.fyHeader = '';
    }
  }

  loadData(){
    //check if logged in
    this.token = localStorage.getItem('token');
    this.authService.userLoggedIn(this.token).subscribe(
      (data) =>{
        localStorage.setItem('id', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('nickname', data.nickname);
        localStorage.setItem('email', data.email);
        localStorage.setItem('dob', data.dateOfBirth);
        localStorage.setItem('profilePicture', data.profilePicture);
        localStorage.setItem('bannerPicture', data.bannerPicture);
        localStorage.setItem('enabled', data.enabled);
        localStorage.setItem('phone', data.phone);

        //set data to page
        this.username = localStorage.getItem('username');
        this.nickname = localStorage.getItem('nickname');
        if(this.nickname == 'null'){
          this.nickname = this.username;
        }
        this.email = localStorage.getItem('email');
        this.phone = localStorage.getItem('phone');
      },
      (error) => {
        this.router.navigateByUrl('/login');
      }
    );
  }

  handleImageSelected(event: any) {
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

  handleGifSelected(event: any){
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
    }
  }

}
