import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth/auth.service';
import { LegendsService } from './legends.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-legends',
  templateUrl: './legends.component.html',
  styleUrls: ['./legends.component.css']
})
export class LegendsComponent implements OnInit, OnDestroy {
  loadFullHeader = true;
  legendHeaderSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private legendsService: LegendsService,
    private authService: AuthService,
    private dataService: DataStorageService) { }

  ngOnInit() {
    // this.legendHeaderSubscription = this.legendsService.legendsHeaderDisplayChanged
    //     .subscribe(
    //       (isHeaderFull: boolean) => {
    //         this.loadFullHeader = isHeaderFull;
    //       }
    //     )
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  //remove function and dataStorage import and instance for production.
  //actually don't remove import or instance because it's init's the legends array from DB
  seedDb(){
    this.dataService.seedLegends();
  }

  ngOnDestroy() {
   //this.legendHeaderSubscription.unsubscribe();
  }

}
