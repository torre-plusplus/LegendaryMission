import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http';
import 'rxjs/Rx';

import { LegendsService } from '../legends/legends.service';
import { AuthService } from '../auth/auth.service';
import { Legend } from '../legends/legends.model';
import { Comment } from './comment.model';

@Injectable()

export class DataStorageService {
  database = firebase.database();
  commentsChanged = new Subject<Comment[]>();

  constructor( private legendsService: LegendsService,
    private authService: AuthService) {
    //pulls data from server on initialization.
    this.getLegends();
  }

  pushNewLegend(title: string, username: string, imagePath: string, story: string) {
    const date = Date.now();

    const legendId: string = this.database.ref('/legends').push({
      title: title,
      username: username,
      imagePath: imagePath,
      story: story,
      date: date
    }).key;
    
    this.legendsService.addLegend(new Legend(title, legendId, username, imagePath, story, date));

    return legendId;
  }

  updateLegend(updatedLegend: Legend, index: number) {
    this.database.ref('/legends/' + updatedLegend.id).set(updatedLegend)
      .then(
        () => {this.legendsService.updateLegend(updatedLegend, index)}
      );
  }

  deleteLegend(legendId: string, index: number) {
    this.database.ref('/legends/' + legendId).remove()
      .then(() => this.legendsService.deleteLegend(index));    
  }

  getLegends() { 
    let legends: Legend[] = [];

    this.database.ref('/legends').once('value')
      .then((data) => {
        data.forEach((returnedLegend) => {
          let legend = returnedLegend.val();
          if(!legend.id) {
            legend.id = returnedLegend.key;
          }
          legends.push(legend);
        })
      })
      .then( () => this.legendsService.setLegends(legends))
     ;
  }

  pushNewComment(legendId: string, comment: string){
    const commentId = this.database.ref('/comments/' + legendId).push().key;
    const date = Date.now();
    const username = this.authService.username;
    this.database.ref('/comments/' + legendId).child(commentId).set({
      username : username,
      date :date,
      id : commentId,
      comment : comment
    });
  }

  initCommentSubject(legendId: string) {
    this.database.ref('/comments/' +legendId).on('value', 
      (data) => {
        if(data.val()) {
          let parsedComments = data.val();
          let comments: Comment[] = [];
          for(let key of Object.keys(parsedComments)) {
              comments.push(parsedComments[key]);
            }
          this.commentsChanged.next(comments);
        }
        else {
          this.commentsChanged.next([]);
        }
      })
  }

  seedComments(legendId: string) {
    this.pushNewComment(legendId, "What's up, Nibbler?!");
    this.pushNewComment(legendId, "Don't do it, Kelsey!");
    this.pushNewComment(legendId, "Ole!");
  }

  seedLegends(){
    this.pushNewLegend(
      "The Legend of the Nibbler",
      "nibbler",
      "https://i.pinimg.com/736x/48/93/45/489345216c555ce396c33e8b4a5f2e93--boston-terrier-puppies-boston-terrier-love.jpg",
      "Once upon a time there was a little Nibbler and his name was The Nibbler."
    );

    this.pushNewLegend(
      "The Epic of Town Topic",
      "torre",
      "https://c1.staticflickr.com/3/2044/2323760575_2c242bba91_b.jpg",
      "At one point, 90% of Mission's caloric intake consisted entirely of Town Topic burgers."
    );

    this.pushNewLegend(
      "The Tale of Going to the Gym",
      "kelsey",
      "https://s3-media1.fl.yelpcdn.com/bphoto/njtGGGYj1HGzuZElCQNVSA/168s.jpg",
      "Every morning, I set my alarm so Torre and I can go to the gym. We've never made it."
    );
  }
}