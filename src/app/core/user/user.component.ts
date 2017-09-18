import { Component, OnInit } from '@angular/core';

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
  userEmail: string;

  constructor(private authService: AuthService,
    private legendsService: LegendsService) { }

  ngOnInit() {
    this.username = this.authService.username;
    this.userEmail = this.authService.userEmail;
    this.userLegends = this.legendsService.getLegendsByUsername(this.username);
  }

}
