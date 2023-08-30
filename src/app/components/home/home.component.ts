import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token:string | null = '';
  username:string | null  = '';
  nickname:string | null = '';
  email:string | null = '';
  dob:string | null = '';
  phone:string | null = '';

  constructor(
    private router:Router,
    private authService:AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.authService.userLoggedIn(this.token).subscribe(
      (data) =>{
        console.log(data);
        localStorage.setItem('id', data.id)
        localStorage.setItem('username', data.username)
        localStorage.setItem('nickname', data.nickname)
        localStorage.setItem('email', data.email)
        localStorage.setItem('dob', data.dateOfBirth)
        localStorage.setItem('profilePicture', data.profilePicture)
        localStorage.setItem('bannerPicture', data.bannerPicture)
        localStorage.setItem('enabled', data.enabled)
        localStorage.setItem('phone', data.phone)
      },
      (error) => {
        this.router.navigateByUrl('/login');
      }
    );

    this.username = localStorage.getItem('username');
    this.nickname = localStorage.getItem('nickname');
    if(this.nickname == 'null'){
      this.nickname = this.username;
    }
    this.email = localStorage.getItem('email');
    this.phone = localStorage.getItem('phone');
  }

}
