import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //header style variables
  fyHeader: string = 'background-color: #252525;  border-bottom: 2px solid #1672b0';
  followingHeader: string = '';

  //Tweet Visibility variables
  selectedTweetVisibilityOption: string = 'EVERYONE';
  tweetVisibilityMatMenuOptions: string[] = [
    'EVERYONE',
    'CIRCLE'
  ];

  //Reply restriction variables
  selectedReplyRestrictionOption: string = 'Everyone can reply'
  replyRestrictionIcon: string = 'public'
  replyRestrictionMatMenuOptions: string[] = [
    'Everyone can reply',
    'People you follow',
    'Only people you mention'
  ];

  //user data variables
  userId: number | null = null;
  token:string | null = '';
  username:string | null  = '';
  nickname:string | null = '';
  email:string | null = '';
  dob:string | null = '';
  phone:string | null = '';

  //new tweet image variables
  selectedImage: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;
  showImage: boolean = true;

  //form variables
  tweetForm: FormGroup

  //posts variables
  feedPosts?: any[];

  constructor(
    private router:Router,
    private authService:AuthenticationService,
    private fb:FormBuilder,
    private postService: PostService
  ) {
    this.tweetForm = fb.group({
      tweetContent: ['']
    })
  }

  ngOnInit(): void {
    //check if logged in
    this.loadData();
    this.loadPosts();
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
    this.authService.userLoggedIn().subscribe(
      (data) =>{
        localStorage.setItem('id', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('nickname', data.nickname);
        localStorage.setItem('email', data.email);
        localStorage.setItem('dob', data.dateOfBirth);
        localStorage.setItem('profilePicture', data.profilePicture);
        localStorage.setItem('bannerPicture', data.bannerPicture);
        localStorage.setItem('phone', data.phone);

        //convert id to number
        const userId: string | null = localStorage.getItem('id');
        if(userId !== null){
          this.userId = parseFloat(userId);
        }

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
        alert("error:" + error.error)
      }
    );
  }

  loadPosts(){
    this.postService.getAllPosts().subscribe(
      data => {
        this.feedPosts = data.reverse();
      }
    );
  }

  submitTweet(){
    const tweetData = {
      content: this.tweetForm.value.tweetContent,
      author: {
        id: this.userId
      },
      replies: [],
      scheduled: false,
      scheduledDate: null,
      audience: this.selectedTweetVisibilityOption,
      replyRestriction: this.convertReplyRestriction(this.selectedReplyRestrictionOption)
    }

    const mediaFile = this.selectedImage;

    if(mediaFile){
      this.postService.createPostWithMedia(tweetData, mediaFile).subscribe(
        data => {
          console.log("media post saved");
          this.showImage = false;
          this.selectedImage = null;
          this.tweetForm.get('tweetContent')?.setValue('')
          this.loadPosts();
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.postService.createPost(tweetData).subscribe(
        data => {
          console.log("text post saved");
          this.tweetForm.get('tweetContent')?.setValue('')
          this.loadPosts();
        },
        error => {
          console.log(error);
        }
      )
    }
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

  handleGifSelected(event: any){
    this.showImage = true;
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
    }
  }

  selectTweetVisibility(option:string){
    this.selectedTweetVisibilityOption = option;
  }

  selectReplyRestriction(replyRestrictionOption:string){
    this.selectedReplyRestrictionOption = replyRestrictionOption;

    if(this.selectedReplyRestrictionOption == 'Everyone can reply'){
      this.replyRestrictionIcon = 'public'
    } else if (this.selectedReplyRestrictionOption == 'People you follow'){
      this.replyRestrictionIcon = 'group'
    } else if (this.selectedReplyRestrictionOption == 'Only people you mention'){
      this.replyRestrictionIcon = 'alternate_email'
    }
  }

  convertReplyRestriction(replyRestriction: string):string{
    if(replyRestriction == 'Everyone can reply'){
      return 'EVERYONE'
    } else if (replyRestriction == 'People you follow'){
      return 'FOLLOW'
    } else if (replyRestriction == 'Only people you mention'){
      return 'MENTION'
    } else return 'EVERYONE'
  }

}
