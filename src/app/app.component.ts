import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyB6bqX3lsQyyA94lkX2hZD6kNFzLXUSsMo",
      authDomain: "legendary-mission.firebaseapp.com",
      databaseURL: "https://legendary-mission.firebaseio.com"
    });
  }

  title = 'app';

  ngOnInit() {
    
    

  }}
