import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() user!: User;
  @Output() callProfilePage = new EventEmitter<void>();
  @Output() callHomePage = new EventEmitter<void>();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  homeBtn(){
    this.router.navigate(['home'])
  }

  profileBtn(){
    this.router.navigate(['/profile'])
  }

}
