import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LegendsService } from '../legends.service';
import { Legend } from '../legends.model';

@Component({
  selector: 'app-legends-index',
  templateUrl: './legends-index.component.html',
  styleUrls: ['./legends-index.component.css']
})


export class LegendsIndexComponent implements OnInit, OnDestroy {
  legends : Legend[];
  filteredLegends: Legend[];
  subscription : Subscription;

  constructor( private legendsService: LegendsService) { }

  ngOnInit() {
    this.subscription = this.legendsService.legendsChanged
      .subscribe(
        (legends: Legend[]) => {
          this.legends = legends;
          this.filterLegends("");
        }
      );
    while(!this.legends){
      this.legends = this.legendsService.getLegends();
    }
    this.filterLegends("");
  }

  filterLegends(searchFilter: string) {
    
    searchFilter = searchFilter.toLowerCase();

    if(!searchFilter){
      this.filteredLegends = this.legends.slice();
    }
    else {
      const resultsArray: Legend[] = [];
      for(const legend of this.legends){
        if(legend.title.toLowerCase().includes(searchFilter)) {
          resultsArray.push(legend);
        }
      } 
      this.filteredLegends = resultsArray;
    }
  }

  sortLegends(sortState: number) {
    switch(sortState) {
      case 0:
        this.filteredLegends.sort(compareRecent);
        break;
      case 1:
        this.filteredLegends.sort(compareStars);
        break;
      case 2:
        this.filteredLegends.sort(compareEldest);
        break;
      case 3:
        this.filteredLegends.sort(compareRandom);
        break;
      case 4:
        this.filteredLegends.sort(compareTitles);
        break;
    }

    function compareRecent (a: Legend, b: Legend){
      return a.date <= b.date ? 1 : -1;
    }
    function compareStars (a: Legend, b: Legend){
      return a.stars <= b.stars ? 1 : -1;
    }
    function compareEldest (a: Legend, b: Legend){
      return a.date >= b.date ? 1 : -1;
    }
    function compareRandom (a: Legend, b: Legend){
      return Math.random() >= Math.random() ? 1 : -1;
    }
    function compareTitles (a: Legend, b: Legend){
      return a.title.toLowerCase() >= b.title.toLowerCase() ? 1 : -1;
    }
  }

  adjustScroll() {
    window.scrollTo(0, 325);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
