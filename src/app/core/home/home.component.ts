import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataStorageService) { }

  ngOnInit() {
     // this.dataService.getLegends();
  }

}
