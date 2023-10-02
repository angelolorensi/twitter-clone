import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';

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

  //Image selection variables
  selectedImage: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;

  //Post variables
  @Output() callLoadPosts = new EventEmitter<void>();

  constructor(
    private userService:UserService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
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
