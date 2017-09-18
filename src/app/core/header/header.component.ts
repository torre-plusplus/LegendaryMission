import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  greeting: string = "Menu"

  constructor(private authService: AuthService) { }

  isAuthenticated(){
    this.username = this.authService.username;
    if(this.username){
      this.greeting = "Welcome, " + this.username;
    }
    return this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
    this.greeting = "Menu";
  }

  ngOnInit() {
  }

}
