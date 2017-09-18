import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Legend } from './legends.model';
// import { DataStorageService } from '../shared/data-storage.service';
@Injectable()

export class LegendsService {
  legendsChanged = new Subject<Legend[]>();

  constructor () {}

  private legends: Legend[] = [];

  setLegends(legends: Legend[]) {
    this.legends = legends;
    this.legendsChanged.next(this.legends.slice());
  }

  getLegends() {
    return this.legends.slice();
  }

  getLegendsByUsername(username: string) {
    let userLegends: Legend[];
    userLegends = this.legends.filter( (legend) => {
      return legend.username == username;
    })
    return userLegends ? userLegends : [];
  }

  getLegendIndex(id: string){
    let index = this.legends.findIndex((elem) => {return elem.id === id});
    return index;
  }

  getLegend(id: string) {
    let index = this.legends.findIndex((elem) => {return elem.id === id});
    return this.legends[index];
  }

  addLegend(legend: Legend) {
    this.legends.push(legend);
    this.legendsChanged.next(this.legends.slice());
  }

  updateLegend(newLegend: Legend, index: number) {
    this.legends[index] = newLegend;
    this.legendsChanged.next(this.legends.slice());
  }

  deleteLegend(index: number) {
    this.legends.splice(index, 1);
    this.legendsChanged.next(this.legends.slice());
  }

}
