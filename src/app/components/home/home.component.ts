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
  homePageFollowing: boolean = false;
  profilePage: boolean = false;
  individualPost: boolean = false;

  //User data variables
  token:string | null = '';
  @Output() user?: User;
  @Output() followingArray: User[] = [];
  @Output() followersArray: User[] = [];

  //Posts variables
  allPosts?: Post[];
  followedPosts?: Post[];
  userPosts?: Post[];
  postId: number = 0;

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
    this.loadFollowedPosts();
  }

  navigateToIndividualPost(postId: number) {
    //this.router.navigate(['post', postId]);
    this.postId = postId;
    this.homePage = false;
    this.profilePage = false;
    this.individualPost = true;
  }

  callProfilePage(){
    this.homePage = false;
    this.profilePage = true;
    this.individualPost = false;
    this.getUserFollowing();
    this.loadProfilePosts(this.user!.id);
  }

  callHomePage(){
    this.homePage = true;
    this.profilePage = false;
    this.individualPost = false;
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
      this.homePageFollowing = false;
      this.homePage = true;
    }
    if(header == 'Following'){
      this.followingHeader = 'background-color: #252525;  border-bottom: 2px solid #1672b0';
      this.fyHeader = '';
      this.homePageFollowing = true;
      this.homePage = false;
      this.loadFollowedPosts();
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

  //Loads followed users posts into the page
  loadFollowedPosts(){
    this.postService.getPostsFromUserFollowing().subscribe(
      data => {
        this.followedPosts = data.reverse();

        this.followedPosts.forEach(
          post => {
            this.userService.getUserFollowing(post.author.username).subscribe(
              following => {
                post.author.followingCount = following.length;
              }
            )

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

  //Loads all posts into the page
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
