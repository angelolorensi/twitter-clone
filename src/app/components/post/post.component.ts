import { PostService } from 'src/app/services/post/post.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  //posts variables
  @Output() callLoadPosts = new EventEmitter<void>();
  @Input() feedPosts?: any[];
  @Input() user?: User;
  isCardVisible = false;
  cardPosition: any = { top: 0, left: 0 };
  currentHoveredPost: any;
  isMouseInCard = false;

  constructor(
    private userService: UserService,
    private postService: PostService
    ) {}

  ngOnInit(): void {

  }

  //Follow logic
  follow(followedUser: string) {
    this.userService.follow(followedUser).subscribe((data) => {
      this.loadPosts();
    });
  }

  likePost(postId: number){
    this.postService.likePost(postId).subscribe(
      data => {
        
      }
    )
  }

  //Displays the user info card when mouse hovered over post
  showUserInfoCard(post: any, event: MouseEvent) {
    this.currentHoveredPost = post;
    this.cardPosition = {
      top: `${event.clientY}px`,
      left: `${event.clientX}px`,
    };
  }

  //hides the user info card when mouse leaves the card
  hideUserInfoCard() {
    setTimeout(() => {
      if (!this.isMouseInCard) {
        this.currentHoveredPost = null;
      }
    }, 200);
  }

  //locks the hideUserInfoCard, so that the user can use the info card
  cancelHideUserInfo() {
    this.isMouseInCard = true;
  }

  //unlock the hideUserInfoCard when mouse leaves the card
  leaveUserInfo() {
    this.isMouseInCard = false;
  }

  loadPosts() {
    this.callLoadPosts.emit();
  }
}
