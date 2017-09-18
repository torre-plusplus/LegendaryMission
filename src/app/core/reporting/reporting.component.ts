import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submitReport(form: NgForm) {
    //actually report the form to the DB here. Probably.
  }

}
