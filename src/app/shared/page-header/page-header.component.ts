import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input() pageName!: string;
  @Input() isHome!: boolean;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  callHomePage(){
    this.router.navigate(['home']);
  }

}
