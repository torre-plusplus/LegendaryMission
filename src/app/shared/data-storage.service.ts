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
    const stars = 0;
    const legendId: string = this.database.ref('/legends').push({
      title: title,
      username: username,
      imagePath: imagePath,
      story: story,
      date: date,
      stars : stars
    }).key;
    
    this.legendsService.addLegend(new Legend(title, legendId, username, imagePath, story, date, stars));

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
          if(!legend.stars) {
            legend.stars = 0;
          }
          legends.push(legend);
        })
      })
      .then( () => this.legendsService.setLegends(legends))
     ;
  }

  upvoteLegend(legendId: string) {
    const username = this.authService.username;
    //Transaction method ensures safe incrementation across concurrent users/instances
    this.database.ref('/legends/' + legendId +'/stars')
      .transaction(
        (legendStars) => {
          //return posts data to server
          return (legendStars || 0) + 1;
        }
      )
      //add starred legend to user DB to prevent double starring
      .then(() => {
        this.database.ref('/users/' + username + '/starred/' + legendId).set(legendId);
        this.authService.userStars.push(legendId);
      })
  }

  downvoteLegend(legendId: string) {
    const username = this.authService.username;
    //Transaction method ensures safe decrementation across concurrent users/instances
    this.database.ref('/legends/' + legendId +'/stars')
      .transaction(
        (legendStars) => {
          //return posts data to server
          return (legendStars || 0) - 1;
        }
      )
      .then(() => {
        this.database.ref('/users/' + username + '/starred/' + legendId).remove();
        const starIndex = this.authService.userStars.indexOf(legendId);
        this.authService.userStars.splice(starIndex, 1);
      })
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

  reportNewIssue(issue: string){
    const username = this.authService.username;
    const date = Date.now();
    this.database.ref('/reports').push({
      username : username,
      date : date,
      issue : issue
    });
  }

  getUserStars(username: string) {
    
  }
}