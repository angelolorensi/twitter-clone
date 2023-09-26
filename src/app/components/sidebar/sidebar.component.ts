import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() user?: User;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  profileBtn(){
    this.router.navigateByUrl('/profile/' + this.user?.username);
  }


}
