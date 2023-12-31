import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Post } from 'src/app/model/Post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  //Input binding variables
  @Input() user?: User;
  @Input() followingArray: User[] = []
  @Input() followersArray: User[] = []
  userPosts?: Post[];

  //Image selection variables
  selectedImage: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;

  constructor(
    private userService:UserService,
    private postService:PostService,
    private authService:AuthenticationService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.authService.userLoggedIn().subscribe(
      data => {
        this.user = data;
        this.postService.getPostsByAuthor(data.id).subscribe(
          data => {
            this.userPosts = data;
          }
        )
      }
    )


  }

  handleImageSelected(event: any, type: string) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedImage = selectedFile;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
        if(type == 'bnr'){
          this.userService.changeBannerPicture(selectedFile).subscribe();
          this.dialog.open(ConfirmationDialogComponent, {
            data: 'Banner',
            panelClass: 'dialog'
          })
        }
        if(type == 'pfp'){
          this.userService.changeProfilePicture(selectedFile).subscribe();
          this.dialog.open(ConfirmationDialogComponent, {
            data: 'Imagem de perfil',
            panelClass: 'dialog'
          })
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  }

}
