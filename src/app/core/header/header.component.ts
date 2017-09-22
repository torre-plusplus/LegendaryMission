import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';
import { AlertService } from '../../shared/alert.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  greeting = "Menu"
  errorSubscription: Subscription;
  successSubscription: Subscription;
  successAlert: string;
  errorAlert: string;
  infoAlert = "For those reviewing this application, please feel free to log in as Nibbler instead of creating a new account. ( nibs@nibs.com / nibbler )"

  constructor(private authService: AuthService,
    private alertService: AlertService) { }

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
    this.successSubscription = this.alertService.newSuccessAlert
      .subscribe(
        (alert: string) => {
          this.successAlert = alert;
          setTimeout( () => {
            this.successAlert = null;
          }, 5000)
        }
      );
    this.errorSubscription = this.alertService.newErrorAlert
      .subscribe(
        (alert: string) => {
          this.errorAlert = alert;
          setTimeout( () => {
            this.errorAlert = null;
          }, 5000)
        }
      )
  }

  ngOnDestroy() {
    this.successSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

}
