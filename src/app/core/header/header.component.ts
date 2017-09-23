import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { AuthService } from '../../auth/auth.service';
import { AlertService } from '../../shared/alert.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('alertAnimation', [
      state('present', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(500)
      ]),
      transition('* => fadeOut', [
        style({
          opacity: 1
        }),
        animate(500, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  username: string;
  greeting = "Menu"
  errorSubscription: Subscription;
  successSubscription: Subscription;
  successAlert: string;
  errorAlert: string;
  present: string;
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
          //Work around for known Angular Animations bug on FadeOut + NgIf (apply state and fade prior to dom removal)
          setTimeout( () => {
            this.present = "fadeOut";
            setTimeout( () => {
              this.successAlert = null;
              this.present = null;
            }, 500)
          }, 2500)
        }
      );
    this.errorSubscription = this.alertService.newErrorAlert
      .subscribe(
        (alert: string) => {
          this.errorAlert = alert;
          //Work around for known Angular Animations bug on FadeOut + NgIf (apply state and fade prior to dom removal)
          setTimeout( () => {
            this.present = "fadeOut";
            setTimeout( () => {
              this.errorAlert = null;
              this.present = null;
            }, 500)
          }, 2500)
        }
      )
  }

  ngOnDestroy() {
    this.successSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

}
 