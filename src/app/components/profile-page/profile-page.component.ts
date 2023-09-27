import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @Input() user?: User;
  @Input() followingArray: User[] = []
  @Input() followersArray: User[] = []

  constructor(private route: ActivatedRoute,
    private userService:UserService) {
  }

  ngOnInit(): void {
  }



}
