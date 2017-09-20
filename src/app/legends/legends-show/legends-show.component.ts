import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { Legend } from '../legends.model';
import { Comment } from '../../shared/comment.model';
import { LegendsService } from '../legends.service';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-legends-show',
  templateUrl: './legends-show.component.html',
  styleUrls: ['./legends-show.component.css']
})
export class LegendsShowComponent implements OnInit, OnDestroy {
  legend: Legend;
  id: string;
  comments: Comment[];
  canEdit = false;
  canComment = false;
  commentSubscription: Subscription;
  legends: Legend[] = [];
  sidebarIndex:number = 0;
  userStarred = false;

  constructor(private legendsService: LegendsService,
    private authService: AuthService,
    private dataService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router) {

    this.route.params.subscribe(
      (params: Params) => {
        this.canEdit = false;
        this.userStarred = false;
        this.id = params['id'];
        this.legend = this.legendsService.getLegend(this.id);
        if(this.legend) {
          this.dataService.initCommentSubject(this.id);
          if(this.legend.username === this.authService.username) {
            this.canEdit = true;
          }
          if(this.authService.username) {
            this.canComment = true;
            this.userStarred = this.authService.userStars.includes(this.id);
          }
          let index = this.legendsService.getLegendIndex(this.legend.id);
          this.sidebarIndex = Math.floor(index/5) * 5;
        }
        if(!this.legend) {
          this.router.navigate(['/not-found']);
        }
      }
    );
  }

  ngOnInit() {
    this.commentSubscription = this.dataService.commentsChanged
      .subscribe(
        (comments: Comment[]) => {
          this.comments = comments;
        } 
      )
    this.dataService.initCommentSubject(this.id); 
    this.legends = this.legendsService.getLegends();
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  postNewComment(commentForm: NgForm) {
    this.dataService.pushNewComment(this.id, commentForm.value.comment);
    commentForm.reset();
  }

  decrementSidebarIndex(){
    this.sidebarIndex -= 5;
    if(this.sidebarIndex < 0) {
      this.sidebarIndex =0;
    }
  }

  incrementSidebarIndex(){
    this.sidebarIndex += 5;
    if(this.sidebarIndex > this.legends.length) {
      this.sidebarIndex -= 5;
    }
  }

  userStars(){
    if(this.canComment) {
      this.legend.stars++;
      this.userStarred = true;
      this.dataService.upvoteLegend(this.legend.id);
    }
  }

  userUnstars() {
    if(this.canComment) {
      this.legend.stars--;
      this.userStarred = false;
      this.dataService.downvoteLegend(this.legend.id);
    }
  }

  onDelete() {
    this.dataService.deleteLegend(this.legend.id, this.legendsService.getLegendIndex(this.id));
    this.router.navigate(['/legends']);
  }

  ngOnDestroy() {
    if(this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }
}
