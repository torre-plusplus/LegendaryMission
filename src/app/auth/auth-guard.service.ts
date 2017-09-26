import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertService } from '../shared/alert.service';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private alertService: AlertService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    const authenticated = this.authService.isAuthenticated();    
    if (authenticated) {
      return true;
    }
    else {
      this.alertService.errorAlert("Rerouting: Must be autheticated.")
      this.router.navigate(['/legends']);
    }
  }

} 