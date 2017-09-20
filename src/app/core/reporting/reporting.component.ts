import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  formSubmitted = false;

  constructor(private dataService: DataStorageService,
    private router: Router) { }

  ngOnInit() {
  }

  submitReport(form: NgForm) {
    this.dataService.reportNewIssue(form.value.report);
    form.reset();
    this.formSubmitted = true;
    setTimeout(() => {this.router.navigate(['/legends'])}, 2000);
  }

}
