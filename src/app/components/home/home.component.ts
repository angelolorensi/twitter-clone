import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FirstLoginDialogComponent } from '../first-login-dialog/first-login-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //header style variables
  fyHeader: string = 'background-color: #252525;  border-bottom: 2px solid #1672b0';
  followingHeader: string = '';

  //user data variables
  @Output() user?: User;
  token:string | null = '';
  userFollowingList: User[] = [];
  userFollowersList: User[] = [];

  //posts variables
  feedPosts?: any[];

  constructor(
    private router:Router,
    private authService:AuthenticationService,
    private postService: PostService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    //check if logged in
    this.loadData();
    this.loadPosts();
  }

  //Opens first login dialog
  firstLogin(){
    if(this.user?.firstLogin){
      const dialogRef = this.dialog.open(FirstLoginDialogComponent, {
        panelClass: 'dialog',
        backdropClass: 'dialog-overlay',
        disableClose: true,
        data: {user : this.user}
      });
    }
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

  //Loads user data into the page
  loadData(){
    //check if logged in
    this.token = localStorage.getItem('token');
    this.authService.userLoggedIn().subscribe(
      (data) => {
        this.user = data;
        this.firstLogin();
      },
      (error) => {
        this.router.navigateByUrl('/login');
        alert("error:" + error.error)
      }
    );
  }

  //Loads posts into the page
  loadPosts(){
    //load all posts
    this.postService.getAllPosts().subscribe(
      data => {
        //Save the post array and invert order of posts so that the newest shows on top
        this.feedPosts = data.reverse();

        //Iterate through the post array
        this.feedPosts?.forEach(
          post =>{

            //Set the post author followings array
            this.userService.getUserFollowing(post.author.username).subscribe(
              following => {
                post.author.followingCount = following;
              }
            )

            //Set the post author followers array
            this.userService.getUserFollowers(post.author.username).subscribe(
              followers => {
                post.author.followersCount = followers;
              }
            )
          }

        )
      }
    );
  }

}
