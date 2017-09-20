import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth/auth.service';
import { LegendsService } from './legends.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-legends',
  templateUrl: './legends.component.html',
  styleUrls: ['./legends.component.css']
})
export class LegendsComponent implements OnInit {

  //Imports for LegendsService and DataService needed to trigger their instancing in their constructors
  constructor(private legendsService: LegendsService,
    private authService: AuthService,
    private dataService: DataStorageService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
