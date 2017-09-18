import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Legend } from '../legends.model';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { LegendsService } from '../legends.service';

@Component({
  selector: 'app-legends-edit',
  templateUrl: './legends-edit.component.html',
  styleUrls: ['./legends-edit.component.css']
})
export class LegendsEditComponent implements OnInit{
  editMode = false;
  paramId :string;
  editForm: FormGroup;
  legendDate: number;


  constructor(private authService: AuthService, 
    private dataService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private legendsService: LegendsService) { }

  ngOnInit() {
    //this.legendsService.loadFullHeader();
    this.route.params.subscribe(
      (params: Params) => {
        this.paramId = params['id'];
        this.editMode = params['id'] != null;
        this.formInit();
      }
    );
  }

  formInit(){
    let title = '';
    let imagePath = '';
    let story = '';

    if(this.editMode) {
      const legend : Legend = this.legendsService.getLegend(this.paramId);
      title = legend.title;
      imagePath = legend.imagePath;
      story = legend.story;
      this.legendDate = legend.date;
    }

    this.editForm = new FormGroup ({
      'title' : new FormControl(title, Validators.required),
      'imagePath' : new FormControl(imagePath, Validators.required),
      'story' : new FormControl(story, Validators.required)
    });
  }

  onSubmit(){
    const title =  this.editForm.value.title;
    const username = this.authService.username;
    const imagePath = this.editForm.value.imagePath;
    const story = this.editForm.value.story;

    if(!this.editMode) {
      const id = this.dataService.pushNewLegend(title, username, imagePath, story);
      this.router.navigate(['/legends', id]);  
    }
    else {
      const legend = new Legend(title, this.paramId, username, imagePath, story, this.legendDate);
      this.dataService.updateLegend(legend, this.legendsService.getLegendIndex(this.paramId));
      setTimeout(
        () => {this.router.navigate(['../'], {relativeTo: this.route});}, 500
      );
    }
  }


}
