import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()

export class AlertService {
  newSuccessAlert = new Subject<string>();
  newErrorAlert = new Subject<string>();

  successAlert(newAlert: string) {
    this.newSuccessAlert.next(newAlert);
  }

  errorAlert(newAlert: string) {
    this.newErrorAlert.next(newAlert)
  }

}