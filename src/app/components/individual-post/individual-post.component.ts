import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { PostService } from 'src/app/services/post/post.service';
import { User } from 'src/app/model/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-individual-post',
  templateUrl: './individual-post.component.html',
  styleUrls: ['./individual-post.component.css']
})
export class IndividualPostComponent implements OnInit {

  //Initial load variables
  postId: number = 0;
  user?: User;
  post!: Post;
  replies: Post[] = [];

  //Reply post variables
  selectedImage: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;
  showImage: boolean = true;
  replyForm: FormGroup;

  constructor(
    private postService: PostService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private authService:AuthenticationService
  ) {
    this.route.params.subscribe(params => {
      const postId = params['postId'];
      this.postId = postId;

      this.authService.userLoggedIn().subscribe(data => this.user = data);
    });

    this.replyForm = fb.group({
      reply: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPost(this.postId);
    this.scrollToTop();
  }

  submitReply(){
    if(!this.replyForm.valid){
      return;
    }

    const tweetData = {
      content: this.replyForm.value.reply,
      author: {
        id: this.user?.id
      },
      replies: [],
      scheduled: false,
      scheduledDate: null,
      audience: null,
      replyRestriction: null
    }

    const mediaFile = this.selectedImage;

    if(mediaFile){
      this.postService.replyToPostWithMedia(this.postId ,tweetData, mediaFile).subscribe(
        data => {
          console.log("media reply saved");
          this.showImage = false;
          this.selectedImage = null;
          this.replyForm.get('reply')?.setValue('')

          this.loadPost(this.postId);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.postService.replyToPost(this.postId ,tweetData).subscribe(
        data => {
          console.log("reply saved");
          this.replyForm.get('reply')?.setValue('')

          this.loadPost(this.postId);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

   //Saves user in the likes array at the liked post then reloads feed
   likeToggle(postId: number){
    this.postService.likePost(postId).subscribe(
      (post:Post) => {
        this.loadPost(this.postId);
      }
    )
  }

  //Return true if logged user has liked the post
  userHasLiked(post: Post): boolean {
    if (!post.likes) {
      return false;
    }
    return post.likes.some(like => like.id === this.post.author.id);
  }

  repost(postId: number){
    this.postService.repost(postId).subscribe(
      (post:Post) => {
        this.loadPost(postId);
      }
    )
  }

  userHasReposted(post: Post): boolean {
    if (!post.reposts) {
      return false;
    }
    return post.reposts.some(repost => repost.id === this.post.author.id);
  }

  loadPost(postId: number) {
    this.postService.getPostById(postId).subscribe((post) => {
      if(post){
        this.postService.getPostReplies(postId).subscribe(
          response => {
            this.post = post;
            this.replies = response;
          }
        )
      } else {
        alert("post failed to load")
      }
    });
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

  scrollToTop() {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }

}
