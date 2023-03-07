import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

export enum EventTypes {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toastsSource = new Subject<any>();
  toasts = this.toastsSource.asObservable();

  constructor() {}

  showSuccessToast(message: string) {
    this.toastsSource.next({
      message,
      type: EventTypes.Success,
    });
  }

  showInfoToast(message: string) {
    this.toastsSource.next({
      message,
      type: EventTypes.Info,
    });
  }


  showErrorToast(message: string) {
    console.log('toast')
    this.toastsSource.next({
      message,
      type: EventTypes.Error,
    });
  }
}
