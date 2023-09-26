import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-tweetbox',
  templateUrl: './tweetbox.component.html',
  styleUrls: ['./tweetbox.component.css']
})
export class TweetboxComponent implements OnInit {

  //User data variables
  @Input() user?: User;

  //Parent function calls
  @Output() callLoadPosts = new EventEmitter<void>();

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

  //new tweet image variables
  selectedImage: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;
  showImage: boolean = true;

  //form variables
  tweetForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    private postService: PostService)
    {
      this.tweetForm = fb.group({
        tweetContent: ['', Validators.required]
      })
  }

  ngOnInit(): void {
  }

  //Tweet submission logic
  submitTweet(){
    if(!this.tweetForm.valid){
      return;
    }

    const tweetData = {
      content: this.tweetForm.value.tweetContent,
      author: {
        id: this.user?.id
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

  loadPosts(){
    this.callLoadPosts.emit();
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
