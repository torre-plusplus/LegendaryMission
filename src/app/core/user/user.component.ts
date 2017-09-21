import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Legend } from '../../legends/legends.model';
import { AuthService } from '../../auth/auth.service';
import { LegendsService } from "../../legends/legends.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string;
  userLegends: Legend[] = [];
  starredLegends: Legend[] = [];
  userEmail: string;
  showPasswordUpdate = false;
  alertText = "";

  constructor(private authService: AuthService,
    private legendsService: LegendsService) { }

  ngOnInit() {
    this.username = this.authService.username;
    this.userEmail = this.authService.userEmail;
    this.userLegends = this.legendsService.getLegendsByUsername(this.username);
    for(let star of this.authService.userStars){
      const legend = this.legendsService.getLegend(star);
      this.starredLegends.push(legend);
    }
  }

  toggleShowPasswordUpdate() {
    this.showPasswordUpdate = !this.showPasswordUpdate;
  }

  //ADD AUTH LOGIC HERE!
  onChangePassword(form: NgForm){
    const currentPassword =  form.value.currentPassword;
    const newPassword = form.value.newPassword;
    this.authService.changePassword(currentPassword, newPassword);
    form.resetForm();
  }

}
