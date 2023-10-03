import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FirstLoginDialogComponent } from '../first-login-dialog/first-login-dialog.component';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { Post } from 'src/app/model/Post';
registerLocaleData(localePT);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Header style variables
  fyHeader: string = 'background-color: #252525;  border-bottom: 2px solid #1672b0';
  followingHeader: string = '';

  //Page variables
  homePage: boolean = true;
  profilePage: boolean = false;

  //User data variables
  token:string | null = '';
  @Output() user?: User;
  @Output() followingArray: User[] = [];
  @Output() followersArray: User[] = [];

  //Posts variables
  allPosts?: Post[];
  userPosts?: Post[];

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
    this.loadAllPosts();
  }

  callProfilePage(){
    this.homePage = false;
    this.profilePage = true;
    this.getUserFollowing();
    this.loadProfilePosts(this.user!.id);
  }

  callHomePage(){
    this.homePage = true;
    this.profilePage = false;
  }

  getUserFollowing(){
    this.userService.getUserFollowing(this.user?.username).subscribe(
      following => {
        this.followingArray = following;
      }
    );
    this.userService.getUserFollowers(this.user?.username).subscribe(
      followers => {
        this.followersArray = followers;
      }
    );
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
  loadAllPosts(){
    //load all posts
    this.postService.getAllPosts().subscribe(
      data => {
        //Save the post array and invert order of posts so that the newest shows on top
        this.allPosts = data.reverse();

        //Iterate through the post array
        this.allPosts?.forEach(
          post =>{

            //Set the post author followings array
            this.userService.getUserFollowing(post.author.username).subscribe(
              following => {
                post.author.followingCount = following.length;
              }
            )

            //Set the post author followers array
            this.userService.getUserFollowers(post.author.username).subscribe(
              followers => {
                post.author.followersCount = followers.length;
              }
            )
          }

        )
      }
    );
  }

  loadProfilePosts(userId: number){
    this.postService.getPostsByAuthor(userId).subscribe(
      data => {
        this.userPosts = data.reverse();

        this.userPosts?.forEach(
          post =>{

            //Set the post author followings array
            this.userService.getUserFollowing(post.author.username).subscribe(
              following => {
                post.author.followingCount = following.length;
              }
            )

            //Set the post author followers array
            this.userService.getUserFollowers(post.author.username).subscribe(
              followers => {
                post.author.followersCount = followers.length;
              }
            )
          }

        )
      }
    )
  }

}
